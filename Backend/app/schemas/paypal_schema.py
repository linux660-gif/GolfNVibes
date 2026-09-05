from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, HttpUrl, Field


class PaymentMethodPreference(str, Enum):
    IMMEDIATE_PAYMENT_REQUIRED = "IMMEDIATE_PAYMENT_REQUIRED"
    UNRESTRICTED = "UNRESTRICTED"


class LandingPage(str, Enum):
    LOGIN = "LOGIN"
    NO_PREFERENCE = "NO_PREFERENCE"
    GUEST_CHECKOUT = "GUEST_CHECKOUT"


class ShippingPreference(str, Enum):
    GET_FROM_FILE = "GET_FROM_FILE"
    NO_SHIPPING = "NO_SHIPPING"
    SET_PROVIDED_ADDRESS = "SET_PROVIDED_ADDRESS"


class UserAction(str, Enum):
    PAY_NOW = "PAY_NOW"
    CONTINUE = "CONTINUE"


class ItemCategory(str, Enum):
    PHYSICAL_GOODS = "PHYSICAL_GOODS"
    DIGITAL_GOODS = "DIGITAL_GOODS"
    DONATION = "DONATION"


class Intent(str, Enum):
    CAPTURE = "CAPTURE"
    AUTHORIZE = "AUTHORIZE"


class Money(BaseModel):
    currency_code: str = Field(..., max_length=3, description="ISO-4217 3-character currency code")
    value: str = Field(..., description="Amount formatted as a string (e.g. '230.00')")


class Breakdown(BaseModel):
    item_total: Optional[Money] = None
    shipping: Optional[Money] = None
    handling: Optional[Money] = None
    tax_total: Optional[Money] = None
    insurance: Optional[Money] = None
    shipping_discount: Optional[Money] = None
    discount: Optional[Money] = None


class Amount(Money):
    breakdown: Optional[Breakdown] = None


class UPC(BaseModel):
    type: str
    code: str


class Item(BaseModel):
    name: str
    description: Optional[str] = None
    unit_amount: Money
    quantity: str
    category: Optional[ItemCategory] = None
    sku: Optional[str] = None
    image_url: Optional[HttpUrl] = None
    url: Optional[HttpUrl] = None
    upc: Optional[UPC] = None


class PurchaseUnit(BaseModel):
    invoice_id: Optional[str] = None
    amount: Amount
    items: Optional[List[Item]] = None


class ExperienceContext(BaseModel):
    payment_method_preference: Optional[PaymentMethodPreference] = None
    landing_page: Optional[LandingPage] = None
    shipping_preference: Optional[ShippingPreference] = None
    user_action: Optional[UserAction] = None
    return_url: HttpUrl
    cancel_url: HttpUrl


class PaypalPaymentSource(BaseModel):
    experience_context: Optional[ExperienceContext] = None


class PaymentSource(BaseModel):
    paypal: Optional[PaypalPaymentSource] = None


class CreateOrderPayload(BaseModel):
    intent: Intent
    payment_source: Optional[PaymentSource] = None
    purchase_units: List[PurchaseUnit]