from pydantic import BaseModel

class Guest(BaseModel):
    name:str

class GuestResponse(Guest):
    id:int