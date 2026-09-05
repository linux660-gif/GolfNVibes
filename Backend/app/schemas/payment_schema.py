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

class MpesaCreatePayment(PaymentCreate):
    pass

class MpesaStkPush(PaymentCreate):
    phone_number: str
    amount : int

class MpesaPayload(BaseModel):
    BusinessShortCode:str
    Password:str
    Timestamp:str
    TransactionType:str
    Amount:str
    PartyA:str
    PartyB:str
    PhoneNumber:str
    CallBackURL:str
    AccountReference:str
    TransactionDesc:str

class PaypalPayload(BaseModel):
    intent:str

    
