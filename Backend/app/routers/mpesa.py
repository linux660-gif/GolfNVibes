from fastapi import APIRouter



from app.schemas.payment_schema import MpesaPayload
from app.clients.mpesa import MpesaClient
from app.clients.paypal import PayPalClient

router = APIRouter(prefix="/api/v1/payment/mpesa", tags=["Mpesa"])
mpesa = MpesaClient()
paypal = PayPalClient()


@router.post("/initiate-stk-push")
async def initiate_stk_push(payment: MpesaPayload):
    return await mpesa.initiate_stk_push(payload=payment.model_dump())