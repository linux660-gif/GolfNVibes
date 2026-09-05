from fastapi import APIRouter



from app.schemas.paypal_schema import CreateOrderPayload
from app.clients.paypal import PayPalClient

router = APIRouter(prefix="/api/v1/payment/paypal", tags=["Paypal"])
paypal = PayPalClient()



@router.post("/create-order")
async def create_order(order: CreateOrderPayload):
    order_dict = order.model_dump(exclude_none=True, mode="json")
    return await paypal.create_order(order_dict)


@router.post("/capture-order/{order_id}")
async def capture_order(order_id: str):

    return await paypal.capture_order(order_id)




