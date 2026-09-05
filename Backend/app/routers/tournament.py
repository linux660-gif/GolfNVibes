from fastapi import APIRouter, HTTPException, Request, status
from sqlalchemy import select
import logging


from app.schemas.tournament_schema import TournamentHost as TournamentHostSchema
from app.db.database import get_db
from app.models.tournament import (
    Host as TournamentHostModel,
    Classification as ClassificationModel,
    Guest as GuestModel,
)
from app.clients.email_client.email_service import EmailService
from app.main import limiter

router = APIRouter(prefix="/api/v1/tournament/host", tags=["Host Tournament"])
logger = logging.getLogger(__name__)
email_service = EmailService()


@router.post("/", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def host_tournament(request: Request, tournament: TournamentHostSchema):
    async with get_db() as db:
        result = await db.execute(
            select(TournamentHostModel.email).where(
                TournamentHostModel.email == tournament.email
            )
        )
        existing_host = result.scalars().first()

        if existing_host:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail="Host Already Exists"
            )
        result = await db.execute(
            select(ClassificationModel).where(
                ClassificationModel.id == tournament.classification_id
            )
        )
        classification_record = result.scalars().first()
        if not classification_record:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Invalid Classification Id",
            )

        result = await db.execute(
            select(GuestModel).where(GuestModel.id == tournament.guest_id)
        )
        guest_record = result.scalars().first()
        if not guest_record:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Guest Id"
            )

        try:
            new_host = TournamentHostModel(
                full_name=tournament.full_name,
                email=tournament.email,
                company=tournament.company,
                classification_id=tournament.classification_id,
                guest_id=tournament.guest_id,
                vision=tournament.vision,
            )
            db.add(new_host)
            await db.commit()
            await db.refresh(new_host)
            logger.info("Host Added")

        except Exception:
            await db.rollback()
            logger.exception("Server Error")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail="Failed to create host")
        try:
            logger.info("Sending email....")
            await email_service.send_host_confirmation(
                email_to=tournament.email,
                company=tournament.company,
                full_name=tournament.full_name,
            )
            logger.info("Confirmation Email Sent")
        except Exception:
            logger.exception("Failed to send host confirmation email")

        return {"message": "Host Successfully Added"}
