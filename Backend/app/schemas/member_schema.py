from pydantic import BaseModel, EmailStr

class MemberBase(BaseModel):
    full_name: str
    email: EmailStr
    handicap:str
    club_id:int
    vision:str

class MemberCreate(MemberBase):
    pass

class MemberUpdate(BaseModel):
    full_name: str | None
    email: EmailStr | None
    handicap:str | None
    club_id:int | None

class MemberResponse(MemberBase):
    pass



