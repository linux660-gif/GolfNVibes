from datetime import datetime, date
from typing import List

from pydantic import BaseModel, EmailStr, Field


class TripService(BaseModel):
    date: date

class TripResponse(TripService):
    trip_id:int

class UpdateTrip(BaseModel):
    pass

class PlanTrip(BaseModel):
    first_name:str = Field(min_length=2, max_length=100)
    last_name:str = Field(min_length=2, max_length=100 )
    email: EmailStr = Field(min_length=5, max_length=255 )
    phone_number: str = Field(min_length=9, max_length=20)
    golfers: int = Field(gt=0, default=1)
    non_golfers: int
    rounds: int = Field(gt=0, default=1 )
    continent_id:int | None = Field(gt=0, default=1)
    destination_id:int | None = Field(gt=0, default=1 )
    start_date: date
    end_date: date
    hotel_id: int = Field(gt=0)
    airport_transfers: bool = Field(default=True)
    flights: bool = Field(default=False )
    flexible_dates:bool = Field(default=True)
    experiences:List[str] = Field(default=[""])
    other_destination:str | None = Field(default="")
    additional_specifications:str|None = Field(default="" )
    budget: str = Field(default="1,500-2,500" )


class PlanTripResponse(PlanTrip):

        model_config = {
            "from_attributes": True
        }

class PlanTripUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr | None = None
    phone_number: str | None = None
    number_of_golfers: int | None = None
    number_of_non_golfers: int | None = None
    golf_rounds: int | None = None
    hotel_preference: str| None = None
    airport_transfers: bool | None = None
    arrange_flights: bool | None = None
    flexible_date: bool | None = None
    experiences: List[str] | None = None
    additional_specifications: str | None = None
    budget: str | None = None





