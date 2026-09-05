# from fastapi import APIRouter, HTTPException, Header, Request, status
# from fastapi.responses import RedirectResponse
# from sqlalchemy import select
# import stripe
# import logging

# from app.core.config import settings
# from app.db.database import get_db


# #from app.schemas.stripe_schema import StripeCheckout

# router = APIRouter(prefix="/api/v1/payments/stripe", tags=["Stripe"])
# logger = logging.getLogger(__name__)

# client = stripe.StripeClient(settings.stripe_secret_key)
# endpoint_secret = (
#     "whsec_9fcb1da2bce680b7980abae5ceca5fdfeda2943701affbffa84888d6241b572a"
# )




# @router.post("/checkout")
# def checkout_session():
#     try:
#         checkout_session = client.v1.checkout.sessions.create(
#             params={
#                 "line_items": [
#                     {
#                         "price": "price_1U8hesDsZ4X8skIOmcBmv3ET",
#                         "quantity": 1,
#                     },
#                 ],
#                 "mode": "payment",
#                 "success_url": "http://localhost:8000/success",
#             },
#         )
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e)) from e

#     if checkout_session.url is None:
#         raise HTTPException(
#             status_code=500, detail="Stripe checkout session has no URL"
#         )

#     return RedirectResponse(url=checkout_session.url)




# @router.post("/webhook", status_code=200)
# async def webhook_events(
#     request: Request, stripe_signature: str = Header(..., alias="Stripe-Signature")
# ):

#     payload = await request.body()

#     try:
#         event = stripe.Webhook.construct_event(
#             payload, stripe_signature, endpoint_secret
#         )
#     except ValueError as e:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST, detail=f"Invalid payload: {e}"
#         )
#     except stripe.SignatureVerificationError as e:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST, detail=f"Invalid signature: {e}"
#         )

#     event_type = event["type"]
#     payment_intent = event["data"]["object"]

#     async with get_db() as db:
#         if event_type == "payment_intent.processing":

#             try:
#                 response = await db.execute(
#                     select(Payments).where(
#                         SamplePayments.payment_intent_id == payment_intent.id
#                     )
#                 )
#                 db_payment_intent = response.scalars().first()
#                 if not db_payment_intent:
#                     new_payment_intent = db.add(
#                         Payments(
#                             payment_intent_id=payment_intent.id, status="PROCESSING"
#                         )
#                     )
#                     await db.commit()
#                     await db.refresh(new_payment_intent)
#                     logger.info("PaymentIntent processing")
#                 logger.info(f"PaymentIntent already exists in the database")

#             except Exception as e:
#                 logger.error(f"Error occurred while adding payment intent: {e}")
#                 raise HTTPException(
#                     status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#                     detail=f"Error occurred while adding payment intent: {e}",
#                 )
#             return {"status": "success"}

#         elif event_type == "payment_intent.succeeded":
#             try:
#                 result = await db.execute(
#                     select(SamplePayments).where(
#                         SamplePayments.payment_intent_id == payment_intent.id
#                     )
#                 )
#                 db_payment_intent = result.scalars().first()
#                 if not db_payment_intent:
#                     new_payment_intent = SamplePayments(
#                         payment_intent_id=payment_intent.id, status="PAID"
#                     )
#                     db.add(new_payment_intent)
#                     await db.commit()
#                     await db.refresh(db_payment_intent)
#                 else:
#                     db_payment_intent.status = "PAID"
#                     await db.commit()
#                     await db.refresh(db_payment_intent)
#                     logger.info("PaymentIntent succeeded")
#             except Exception as e:
#                 logger.error(f"Error occurred while adding payment intent: {e}")
#                 await db.rollback()
#                 raise HTTPException(
#                     status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#                     detail=f"Error occurred while adding payment intent: {e}",
#                 )

#         elif event_type == "payment_intent.payment_failed":

#             try:
#                 response = await db.execute(
#                     select(SamplePayments).where(
#                         SamplePayments.payment_intent_id == payment_intent.id
#                     )
#                 )
#                 db_payment_intent = response.scalars().first()
#                 if not db_payment_intent:
#                     new_payment_intent = SamplePayments(
#                         payment_intent_id=payment_intent.id, status="FAILED"
#                     )
#                     db.add(new_payment_intent)
#                     await db.commit()
#                     await db.refresh(new_payment_intent)

#                 else:
#                     db_payment_intent.status = "FAILED"
#                     await db.commit()
#                     await db.refresh(db_payment_intent)
#                     logger.info("PaymentIntent failed")
#             except Exception as e:
#                 logger.error(f"Error occurred while adding payment intent: {e}")
#                 await db.rollback()
#                 raise HTTPException(
#                     status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#                     detail=f"Error occurred while adding payment intent: {e}",
#                 )

#         else:
#             logger.info(f"Unhandled event type: {event_type}")

#     return {"status": "success"}
