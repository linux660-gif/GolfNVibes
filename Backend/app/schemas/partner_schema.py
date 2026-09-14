from datetime import datetime

from pydantic import BaseModel, EmailStr


class PartnerBase(BaseModel):
    organization: str
    partner_type_id: int
    email:EmailStr
    details:str

class PartnerCreate(PartnerBase):
    pass


class PartnerResponse(PartnerBase):
    pass


class PartnerCategory(BaseModel):
    name:str
    create_at:datetime

class PartnerCategoryResponse(BaseModel):
    id: int
    name: str


