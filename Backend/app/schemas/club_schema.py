from datetime import datetime

from pydantic import BaseModel

class ClubCreate(BaseModel):
    name:str
    created_at:datetime
class ClubResponse(ClubCreate):
    pass


