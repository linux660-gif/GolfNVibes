from pydantic import BaseModel, EmailStr


class NewsLetter(BaseModel):
    email: EmailStr

class NewsLetterCreate(NewsLetter):
    pass

class NewsLetterUpdate(NewsLetter):
    email: EmailStr

class NewsLetterResponse(NewsLetterCreate):
    pass
