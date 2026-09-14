from pydantic import BaseModel

class Destination(BaseModel):
    continent_id:int
    name:str

class DestinationResponse(BaseModel):
    id: int
    name: str
    continent_id: int

