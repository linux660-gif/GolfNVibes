from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Mapped


class TournamentBase(BaseModel):
    pass


class TournamentCreate(TournamentBase):
    pass


class TournamentUpdate(TournamentBase):
    pass


class TournamentResponse(TournamentBase):
    pass


class TournamentHost(BaseModel):
    full_name:str
    email: EmailStr
    company:str
    classification_id:int
    guest_id:int
    vision:str

class TournamentBook(BaseModel):
    full_name:str
    email:EmailStr
    phone_number:str
    checkout_id:str
    amount:float
    payment_method_id:int
    status:str
    tournament_reference:str




