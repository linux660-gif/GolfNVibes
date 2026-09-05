from datetime import datetime, date
from typing import List

from pydantic import BaseModel, EmailStr


class TripService(BaseModel):
    destination: str
    date: date

class TripResponse(TripService):
    trip_id:int

class UpdateTrip(BaseModel):
    pass

class PlanTrip(TripService):
    first_name:str
    last_name:str
    email: EmailStr
    phone_number: str
    golfers: int
    non_golfers: int
    rounds: str
    continent_id:int
    destination_id:int
    hotel_id: int
    airport_transfers: bool
    flights: bool
    flexible_dates:bool
    experiences:List[str]
    other_destination:str
    additional_specifications:str
    budget: str
    created_at: datetime


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





