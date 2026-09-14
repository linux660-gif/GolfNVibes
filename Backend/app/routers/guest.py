from typing import List

from fastapi import APIRouter, HTTPException, status, Request
from sqlalchemy import select
import logging


from app.db.database import get_db
from app.schemas.guest_schema import Guest as GuestSchema, GuestResponse
from app.models.tournament import Guest as GuestModel
from app.main import limiter
from app.auth import CurrentUser


router = APIRouter(prefix="/api/v1/tournament/guest", tags=["Guest"])
logger = logging.getLogger(name=__name__)



@router.post("/", status_code=status.HTTP_201_CREATED)
@limiter.limit("2/minute")
async def add_guest(request:Request, GuestSchema:GuestSchema, current_user: CurrentUser):
    async with get_db() as db:
        result = await db.execute(select(GuestModel).where(GuestModel.name == GuestSchema.name))
        existing_guest = result.scalars().all()
        if not existing_guest:
            try:
                new_guest = GuestModel(name= GuestSchema.name)
                db.add(new_guest)
                await db.commit()
                await db.refresh(new_guest)
                logger.info("Guest Created")
                return {"message":"Guest Created Successfully"}
            except Exception:
                logger.exception("Error Adding Guest to Database")
                raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Server Error")
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Guest already exists")

    
@router.get("/", status_code=status.HTTP_200_OK, response_model=List[GuestResponse])
@limiter.limit("5/minute")
async def get_guest(request:Request):
    async with get_db() as db:
        result = await db.execute(select(GuestModel))
        existing_guests = result.scalars().all()
        if not existing_guests:
             return []
        return existing_guests