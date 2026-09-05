from pydantic import BaseModel, EmailStr


class TournamentBase(BaseModel):
    pass


class TournamentCreate(TournamentBase):
    pass


class TournamentUpdate(TournamentBase):
    pass


class TournamentResponse(TournamentBase):
    pass


class TournamentHost(TournamentBase):
    full_name:str
    email: EmailStr
    company:str
    classification_id:str
    guest_id:str
    vision:str


