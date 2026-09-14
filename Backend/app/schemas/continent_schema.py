from typing import List

from pydantic import BaseModel

class Continent(BaseModel):
    name:str

class ContinentResponse(Continent):
    id:int
