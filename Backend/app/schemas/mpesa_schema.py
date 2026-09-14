from typing import Optional, Any, List

from pydantic import BaseModel, Field


class CallbackItem(BaseModel):
    Name:str
    Value: Optional[Any] = None

class CallbackMetadata(BaseModel):
    Item: List[CallbackItem]

class StkCallback(BaseModel):
    MerchantRequestId:str
    CheckoutRequestId:str
    ResultCode:int
    ResultDesc:str
    CallbackMetadata:Optional[CallbackMetadata] = None

class MpesaCallbackPayload(BaseModel):
    Body: dict = Field(..., description="The Wrapper body containing the STK Callback metadata")
    @property
    def callback_data(self) -> StkCallback:
        return StkCallback(**self.Body["stkCallback"])




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

