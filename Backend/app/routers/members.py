from fastapi import APIRouter, HTTPException, status, Request
from sqlalchemy import delete, select
import logging
from typing import List


from app.db.database import get_db
from app.clients.email_client.email_service import EmailService
from app.schemas.member_schema import MemberCreate as MemberCreateSchema,MemberResponse
from app.models.member import Members as MembersModel, Club as ClubModel
from app.main import limiter

router = APIRouter(prefix="/api/v1/member", tags=["Member"])
logger = logging.getLogger(name=__name__)
email_service = EmailService()


@router.post("/", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def create_member(request: Request, member: MemberCreateSchema):
    async with get_db() as db:
        result = await db.execute(
            select(MembersModel).where(MembersModel.email == member.email)
        )
        existing_member = result.scalars().first()
        if not existing_member:
            result = await db.execute(select(ClubModel).where(ClubModel.id == member.club_id))
            club_record = result.scalars().first()
            
            if not club_record:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Club not found")

            club = club_record.name
            new_member = MembersModel(
                full_name=member.full_name,
                email=member.email,
                handicap=member.handicap,
                club=member.club_id,
                vision=member.vision,
            )
            try:
                db.add(new_member)
                await db.commit()
                await db.refresh(new_member)
                logger.info("Member created")
            except Exception:
                await db.rollback()
                logger.exception("Failed to add to databse")
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Member creation failed",
                )

            try:
                await email_service.send_membership_confirmation(
                    email_to=member.email,
                    club=club,
                    full_name=member.full_name,
                )
                logger.info("Email Sent")
            except Exception:
                logger.exception("Failed to send Email")
            return {"message": "Member successfully created"}

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Member already exists"
        )


@router.get("/", status_code=status.HTTP_200_OK, response_model=List[MemberResponse])
@limiter.limit("5/minute")
async def get_members(request: Request):
    async with get_db() as db:
        query = select(MembersModel)

        result = await db.execute(query)

        members = result.scalars().all()

        if not members:
            logger.warning("Members list is Empty")
            return []
        logger.info("Members successfully Retrieved")
        return members


@router.delete("/{member_id}")
@limiter.limit("5/minute")
async def delete_member_by_id(request:Request,member_id: int):
    async with get_db() as db:
        result = await db.execute(
            select(MembersModel).where(MembersModel.id == member_id)
        )
        existing_member = result.scalars().first()
        if not existing_member:
            logger.error("Member Not Found")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Member not Found"
            )
        try:
            await db.execute(delete(MembersModel).where(MembersModel.id == member_id))
            await db.commit()
            logger.info("Member Deleted")
            return {"message": "Member Deleted Successfully"}
        except Exception:
            logging.exception("Error deleting Member")
            await db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal Server Error",
            )



