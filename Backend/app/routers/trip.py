import datetime
from fastapi import APIRouter, HTTPException, Request, status, Query
from sqlalchemy import select, delete
import logging
from typing import Dict

from app.db.database import get_db
from app.schemas.trip_schema import (
    PlanTrip,
    PlanTripResponse,
    PlanTripUpdate as PlanTripUpdateSchema,
)
from app.models.hotel import HotelCategory
from app.models.destination import Continent, Destination
from app.models.trip import CustomTrip as TripModel
from app.clients.email_client.email_service import EmailService
from app.main import limiter

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/trip", tags=["Trip"])
email_service = EmailService()


@router.post("/", status_code=status.HTTP_201_CREATED)
@limiter.limit("2/minute")
async def add_custom_trip(request: Request, trip: PlanTrip) -> Dict[str, str]:
    async with get_db() as db:

        result = await db.execute(
            select(TripModel).where((TripModel.email == trip.email))
        )

        existing_trip = result.scalars().first()

        if existing_trip:

            logger.warning("Trip already exists")

            raise HTTPException(
                status_code=409, detail="Failed to Create: Trip already exists"
            )
        result = await db.execute(
            select(HotelCategory).where(HotelCategory.id == trip.hotel_id)
        )
        hotel_record = result.scalar_one_or_none()

        if not hotel_record:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Hotel Id"
            )

        result = await db.execute(
            select(Destination).where(Destination.id == trip.destination_id)
        )
        destinantion_record = result.scalar_one_or_none()
        if not destinantion_record:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Destinantion Id"
            )
        result = await db.execute(
            select(Continent).where(Continent.id == trip.continent_id)
        )
        destinantion_record = result.scalar_one_or_none()
        if not destinantion_record:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Continent Id"
            )

        new_trip = TripModel(
            first_name=trip.first_name,
            last_name=trip.last_name,
            email=trip.email,
            phone_number=trip.phone_number,
            golfers=trip.golfers,
            non_golfers=trip.non_golfers,
            budget=trip.budget,
            rounds=trip.rounds,
            experiences=trip.experiences,
            additional_specifications=trip.additional_specifications,
            airport_transfers=trip.airport_transfers,
            date=trip.date,
            hotel_id=trip.hotel_id,
            flights=trip.flights,
            destination_id=trip.destination_id,
            other_destination=trip.other_destination,
            continent_id=trip.continent_id,
            flexible_dates=trip.flexible_dates,
            created_at=datetime.datetime.now(datetime.timezone.utc),
        )

        try:
            db.add(new_trip)
            await db.commit()
            await db.refresh(new_trip)

            logger.info("Trip Created")

        except Exception:
            logger.exception("Database Error")
            await db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal Server Error",
            )
        try:
            await email_service.send_plan_trip_confirmation(
                email_to=trip.email,
                destination=trip.destination,
                first_name=trip.first_name,
                second_name=trip.last_name,
            )
            logger.info("Email Sent")
        except Exception:
            logger.exception("Failed to send Email")
        return {"message": "Trip Successfully Created"}


@router.get("/", status_code=status.HTTP_200_OK, response_model=list[PlanTripResponse])
@limiter.limit("2/minute")
async def get_custom_trips(
    request: Request,
    email: str | None = Query(default=None),
    phone: str | None = Query(default=None),
    trip_id: int | None = Query(default=None),
    limit: int = Query(default=10, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
):
    async with get_db() as db:

        query = select(TripModel)

        if email:
            query = query.where(TripModel.email == email)

        if phone:
            query = query.where(TripModel.phone_number == phone)
        if trip_id is not None:
            query = query.where(TripModel.trip_id == trip_id)

        query = query.limit(limit).offset(offset)

        result = await db.execute(query)

        trips = result.scalars().all()

        if not trips:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Trips not found"
            )

        return trips


@router.patch("/{trip_id}", status_code=status.HTTP_200_OK)
@limiter.limit("2/minute")
async def update_trip(request: Request, trip_id: int, trip: PlanTripUpdateSchema):
    async with get_db() as db:
        result = await db.execute(select(TripModel).where(TripModel.trip_id == trip_id))
        available_trip = result.scalars().first()
        if not available_trip:
            logger.error("Trip Update Failed")

            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="failed to Update: Trip not found",
            )

        update_data = trip.model_dump(exclude_unset=True)
        allowed_fields = {
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "budget",
            "golfers",
            "non_golfers",
            "rounds",
            "experiences",
            "additional_specifications",
            "airport_transfers",
            "flexible_dates",
            "hotel",
            "flights",
            "other_destination",
        }
        for field, value in update_data.items():
            if field in allowed_fields:
                setattr(available_trip, field, value)
        try:
            await db.commit()
            await db.refresh(available_trip)
            logger.info("Trip Updated")
            return {"message": "Trip Updated Successfully"}
        except Exception:
            logging.exception("Database Error")
            await db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal Server Error",
            )


@router.delete("/{trip_id}", status_code=status.HTTP_200_OK)
@limiter.limit("2/minute")
async def delete_trip(request: Request, trip_id: int):
    async with get_db() as db:
        result = await db.execute(select(TripModel).where(TripModel.trip_id == trip_id))
        trip = result.scalars().first()
        if not trip:
            logger.error(f"Failed to delete trip with id: {trip_id}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Failed to Delete: Trip not found",
            )
        try:
            await db.delete(trip)
            await db.commit()
            return {"message": "Trip deleted successfully"}
        except Exception:
            logger.exception("Database Error")
            await db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal Server Error",
            )


@router.delete("/", status_code=status.HTTP_200_OK)
@limiter.limit("2/minute")
async def delete_trips(request: Request):
    async with get_db() as db:
        try:
            await db.execute(delete(TripModel))
            await db.commit()
            return {"message": " trips deleted"}
        except Exception:
            await db.rollback()
            logger.exception("Database Error")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal Server Error",
            )
