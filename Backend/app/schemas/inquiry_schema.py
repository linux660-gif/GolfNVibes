from pydantic import BaseModel, EmailStr

class InquiryBase(BaseModel):
    name:str
    email:EmailStr
    topic:str
    message:str

class InquiryCreate(InquiryBase):
    pass


class InquiryResponse(InquiryBase):
    pass

class InquiryUpdate(InquiryBase):
    pass


    