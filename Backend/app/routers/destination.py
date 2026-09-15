from typing import List

from fastapi import APIRouter, HTTPException, status, Request
from sqlalchemy import select
import logging


from app.db.database import get_db
from app.schemas.destination_schema import (
    Destination as DestinationSchema,
    DestinationResponse,
)
from app.models.destination import Destination as DestinationModel
from app.models.destination import Continent
from app.main import limiter
from app.auth import CurrentUser

router = APIRouter(prefix="/api/v1/trip/destination", tags=["Destination"])
logger = logging.getLogger(name=__name__)


@router.post("/", status_code=status.HTTP_201_CREATED)
@limiter.limit("2/minute")
async def add_destination(request: Request, destinationSchema: DestinationSchema,current_user: CurrentUser):
    async with get_db() as db:
        result = await db.execute(
            select(DestinationModel).where(
                DestinationModel.name == destinationSchema.name
            )
        )
        existing_destination = result.scalars().all()
        if not existing_destination:
            result = await db.execute(
                select(Continent).where(Continent.id == destinationSchema.continent_id)
            )
            continent = result.scalar_one_or_none()

            if not continent:
                raise HTTPException(status_code=404, detail="Continent not found")
            try:
                new_destination = DestinationModel(name=destinationSchema.name, continent_id= destinationSchema.continent_id)
                db.add(new_destination)
                await db.commit()
                await db.refresh(new_destination)
                logger.info("Destination Created")
                return {"message": "Destination Created Successfully"}
            except Exception:
                logger.exception("Error Adding Destination to Database")
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Server Error",
                )
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Destination already exists"
        )


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=List[DestinationResponse],
)
@limiter.limit("5/minute")
async def get_destinations(
    request: Request,
    continent_id: int,
):
    async with get_db() as db:
        result = await db.execute(
            select(DestinationModel).where(
                DestinationModel.continent_id == continent_id
            )
        )

        existing_destinations = result.scalars().all()

        if not existing_destinations:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No destinations found for this continent",
            )

        return existing_destinations
