from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    is_active: bool
    role: str


class UserResponse(BaseModel):
    email: EmailStr
    is_active: bool
    role: str

class Token(BaseModel):
    access_token: str
    token_type: str