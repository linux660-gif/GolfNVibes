from pydantic import BaseModel

class Destination(BaseModel):
    continent_id:int
    name:str

class DestinationResponse(Destination):
    pass