from typing import List

from fastapi import APIRouter, HTTPException, status, Request
from sqlalchemy import select
import logging


from app.db.database import get_db
from app.schemas.continent_schema import Continent as ContinentSchema, ContinentResponse
from app.models.destination import Continent as ContinentModel
from app.main import limiter
from app.auth import CurrentUser


router = APIRouter(prefix="/api/v1/destination/continent", tags=["Continent"])
logger = logging.getLogger(name=__name__)


@router.post("/", status_code=status.HTTP_201_CREATED)
@limiter.limit("2/minute")
async def add_continent(request: Request, ContinentSchema: ContinentSchema,current_user:CurrentUser):
    async with get_db() as db:
        result = await db.execute(
            select(ContinentModel).where(ContinentModel.name == ContinentSchema.name)
        )
        existing_continent = result.scalars().all()
        if not existing_continent:
            try:
                new_continent = ContinentModel(name=ContinentSchema.name)
                db.add(new_continent)
                await db.commit()
                await db.refresh(new_continent)
                logger.info("Continent Created")
                return {"message": "Continent Created Successfully"}
            except Exception:
                logger.exception("Error Adding Continent to Database")
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Server Error",
                )
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Continent already exists"
        )


@router.get("/", status_code=status.HTTP_200_OK, response_model=List[ContinentResponse])
@limiter.limit("5/minute")
async def get_destination(request: Request):
    async with get_db() as db:
        result = await db.execute(select(ContinentModel))
        existing_continents = result.scalars().all()
        if not existing_continents:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No record Found")
        return existing_continents
