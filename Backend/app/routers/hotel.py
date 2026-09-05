from typing import List

from fastapi import APIRouter, HTTPException, status, Request
from sqlalchemy import select
import logging


from app.db.database import get_db
from app.schemas.hotel_schema import Hotel as HotelSchema, HotelResponse
from app.models.hotel import HotelCategory as HotelModel
from app.main import limiter

router = APIRouter(prefix="/api/v1/trip/hotel", tags=["Hotel"])
logger = logging.getLogger(name=__name__)


@router.post("/", status_code=status.HTTP_201_CREATED)
@limiter.limit("2/minute")
async def add_hotel(request: Request, HotelSchema: HotelSchema):
    async with get_db() as db:
        result = await db.execute(
            select(HotelModel).where(HotelModel.name == HotelSchema.name)
        )
        existing_hotel = result.scalars().all()
        if not existing_hotel:
            try:
                new_hotel = HotelModel(name=HotelSchema.name)
                db.add(new_hotel)
                await db.commit()
                await db.refresh(new_hotel)
                logger.info("Hotel Created")
                return {"message": "Hotel Created Successfully"}
            except Exception:
                logger.exception("Error Adding Hotel to Database")
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Server Error",
                )
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Hotel already exists"
        )


@router.get("/", status_code=status.HTTP_200_OK, response_model=List[HotelResponse])
@limiter.limit("5/minute")
async def get_hotel(request: Request):
    async with get_db() as db:
        result = await db.execute(select(HotelModel))
        existing_hotels = result.scalars().all()
        if not existing_hotels:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No record Found")
        return existing_hotels
