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


class PartnerUpdate(PartnerBase):
    pass

