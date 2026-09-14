from typing import  Dict


from pydantic import BaseModel


class PaymentCreate(BaseModel):
    payload:Dict[str,str]



class PayPalCreateOrder(PaymentCreate):
    pass

class PayPalOrderPayload(BaseModel):
    intent: str
    purchase_units:str

class PayPalCaptureOrder(PaymentCreate):
    order_id: str


class PaypalPayload(BaseModel):
    intent:str

    
