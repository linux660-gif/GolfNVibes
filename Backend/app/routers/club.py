from typing import List

from fastapi import APIRouter, HTTPException, status, Request
from sqlalchemy import select
import logging
import datetime


from app.db.database import get_db
from app.clients.email_client.email_service import EmailService
from app.schemas.club_schema import ClubCreate as ClubSchema, ClubResponse
from app.models.member import Club as ClubModel
from app.main import limiter
from app.auth import CurrentUser

router = APIRouter(prefix="/api/v1/member/club", tags=["Club"])
logger = logging.getLogger(name=__name__)
email_service = EmailService()


@router.post("/", status_code=status.HTTP_201_CREATED)
@limiter.limit("2/minute")
async def add_club(request: Request, clubSchema: ClubSchema,current_user:CurrentUser):
    async with get_db() as db:
        result = await db.execute(
            select(ClubModel).where(ClubModel.name == clubSchema.name)
        )
        existing_club = result.scalars().all()
        if not existing_club:
            try:
                new_club = ClubModel(
                    name=clubSchema.name, created_at=datetime.datetime.now()
                )
                db.add(new_club)
                await db.commit()
                await db.refresh(new_club)
                logger.info("Club Created")
                return {"message": "Club Created Successfully"}
            except Exception:
                logger.exception("Error Adding Club to Database")
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Server Error",
                )
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Club already exists"
        )


@router.get("/", status_code=status.HTTP_200_OK, response_model=List[ClubResponse])
@limiter.limit("5/minute")
async def get_club(request: Request):
    async with get_db() as db:
        result = await db.execute(select(ClubModel))
        existing_clubs = result.scalars().all()
        if not existing_clubs:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not Found")
        return existing_clubs
