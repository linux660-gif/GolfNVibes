from fastapi import APIRouter,status,Request
from sqlalchemy import select
import logging

from app.db.database import  get_db
from app.schemas.mpesa_schema import MpesaCallbackPayload,MpesaPayload
from app.models.payments import MpesaPayment,TournamentPayment
from app.clients.mpesa import MpesaClient




router = APIRouter(prefix="/api/v1/payment/mpesa", tags=["Mpesa"])
mpesa = MpesaClient()
logger = logging.getLogger(__name__)


# @router.post("/initiate-stk-push")
# async def initiate_stk_push(payment: MpesaPayload):
#     return await mpesa.initiate_stk_push(payload=payment.model_dump())



@router.post("/callback", status_code=status.HTTP_200_OK)
async def mpesa_callback(request:Request,callback_payload:MpesaCallbackPayload):
    if callback_payload.ResultCode != 0:
        logger.warning(f"STK Push Failed. CheckoutID:{callback_payload.CheckoutID}."
                       f"Reason: {callback_payload.ResultDesc} (Code: {callback_payload.ResultCode})")
        return {"ResultCode":0, "ResultDesc":"Acknowledgement received"}
    if callback_payload.CallbackMetadata and callback_payload.CallbackMetadata.Item:
        meta_dict = {item.Name: item.Value for item in callback_payload.CallbackMetadata.Item}
        amount = meta_dict.get("Amount")
        mpesa_receipt = meta_dict.get("MpesaReceiptNumber")
        phone_number = meta_dict.get("PhoneNumber")
        transaction_date = meta_dict.get("TransactionDate")
        logger.info(f"STK Push Success! Receipt:{mpesa_receipt}")


        async with get_db() as db:
            result = await db.execute(select(MpesaPayment).where(MpesaPayment.mpesa_receipt == mpesa_receipt))
            existing_payment = result.scalar_one_or_none()
            if existing_payment:
                logger.error("mpesa_payment already exists")
                return {
                    "ResultCode": 0,
                    "ResultDesc": "Acknowledgement received",
                }
            try:
                checkout_result = await db.execute(
                    select(MpesaPayment).where(MpesaPayment.checkout_id == callback_payload.CheckoutID))
                payment = checkout_result.scalar_one_or_none()

                if not payment:
                    logger.error(
                        "No pending Payment found for CheckoutRequestID=%s",
                        callback_payload.CheckoutID,
                    )
                    return {"ResultCode": 0, "ResultDesc": "Acknowledgement received"}


                if payment.phone_number != phone_number:
                    logger.error("Mismatch in the Mpesa Payment Numbers")
                    return {
                        "ResultCode": 0,
                        "ResultDesc": "Acknowledgement received",
                    }


                payment.status = "PAID"
                new_payment = MpesaPayment(mpesa_receipt=mpesa_receipt,amount=amount,transaction_date=transaction_date,phone_number=phone_number)
                db.add(new_payment)
                await db.commit()
                logger.info("Mpesa Transaction Successfully Added to Database")
                await db.refresh(new_payment)

            except Exception:
                await db.rollback()
                logger.info(
                    "M-PESA payment successfully processed. Receipt=%s",
                    mpesa_receipt,
                )
                raise
    return {"ResultCode":0, "ResultDesc":"Success"}


@router.post("/callback")
async def mpesa_callback(
    request: Request,
    callback_payload: MpesaCallbackPayload,
):
    callback = callback_payload.Body.stkCallback

    # 1. Payment failed/cancelled
    if callback.ResultCode != 0:
        logger.warning(
            "M-PESA payment failed. "
            "CheckoutRequestID=%s ResultCode=%s Reason=%s",
            callback.CheckoutRequestID,
            callback.ResultCode,
            callback.ResultDesc,
        )

        return {
            "ResultCode": 0,
            "ResultDesc": "Acknowledgement received",
        }

    # 2. Successful callback must contain metadata
    if not callback.CallbackMetadata:
        logger.error(
            "Successful M-PESA callback has no metadata. CheckoutRequestID=%s",
            callback.CheckoutRequestID,
        )

        return {
            "ResultCode": 0,
            "ResultDesc": "Acknowledgement received",
        }

    meta_dict = {
        item.Name: item.Value
        for item in callback.CallbackMetadata.Item
    }

    amount = meta_dict.get("Amount")
    mpesa_receipt = meta_dict.get("MpesaReceiptNumber")
    phone_number = meta_dict.get("PhoneNumber")
    transaction_date = meta_dict.get("TransactionDate")

    if not mpesa_receipt:
        logger.error(
            "Successful M-PESA callback missing receipt. CheckoutRequestID=%s",
            callback.CheckoutRequestID,
        )

        return {
            "ResultCode": 0,
            "ResultDesc": "Acknowledgement received",
        }

    async with get_db() as db:

        # 3. Check whether this callback was already processed
        result = await db.execute(
            select(MpesaPayment).where(
                MpesaPayment.mpesa_receipt == mpesa_receipt
            )
        )

        existing_payment = result.scalar_one_or_none()

        if existing_payment:
            logger.warning(
                "Duplicate M-PESA callback. Receipt=%s",
                mpesa_receipt,
            )

            return {
                "ResultCode": 0,
                "ResultDesc": "Acknowledgement received",
            }

        # 4. Find the original tournament payment
        result = await db.execute(
            select(TournamentPayment).where(
                TournamentPayment.checkout_id
                == callback.CheckoutRequestID
            )
        )

        tournament_payment = result.scalar_one_or_none()

        if not tournament_payment:
            logger.error(
                "Tournament payment not found. CheckoutRequestID=%s",
                callback.CheckoutRequestID,
            )

            return {
                "ResultCode": 0,
                "ResultDesc": "Acknowledgement received",
            }

        # 5. Verify amount
        if amount != tournament_payment.amount:
            logger.error(
                "M-PESA amount mismatch. CheckoutRequestID=%s "
                "Expected=%s Received=%s",
                callback.CheckoutRequestID,
                tournament_payment.amount,
                amount,
            )

            return {
                "ResultCode": 0,
                "ResultDesc": "Acknowledgement received",
            }

        try:
            # 6. Mark original payment as paid
            tournament_payment.status = "PAID"

            # 7. Store M-PESA transaction
            new_payment = MpesaPayment(
                mpesa_receipt=mpesa_receipt,
                amount=amount,
                transaction_date=transaction_date,
                phone_number=phone_number,
            )

            db.add(new_payment)

            await db.commit()

            logger.info(
                "M-PESA payment successfully processed. Receipt=%s",
                mpesa_receipt,
            )

        except Exception:
            await db.rollback()

            logger.exception(
                "Failed to process M-PESA payment. CheckoutRequestID=%s",
                callback.CheckoutRequestID,
            )

            # Don't pretend our internal processing succeeded.
            raise

    return {
        "ResultCode": 0,
        "ResultDesc": "Acknowledgement received",
    }
