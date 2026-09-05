from pydantic import BaseModel



class StripeCheckout(BaseModel):
    price_id:str