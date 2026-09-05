from pydantic import BaseModel

class Hotel(BaseModel):
    name:str

class HotelResponse(Hotel):
    pass