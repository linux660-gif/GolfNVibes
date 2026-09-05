from fastapi import APIRouter, Request, status, HTTPException
from sqlalchemy import select
import logging

from app.db.database import  get_db
from app.models.newsletter import NewsLetter as NewsLetterModel
from app.schemas.newletter_schema import NewsLetterCreate, NewsLetterUpdate
from app.clients.email_client.email_service import EmailService
from app.main import limiter



router = APIRouter(prefix="/api/v1/newsletter" ,tags=['Newsletter'])
logger = logging.getLogger(__name__)
email_service = EmailService()



@router.post("/", tags=['Newsletter'], status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def add_subscriber(request:Request,user:NewsLetterCreate):
    async with get_db() as db:
       result = await db.execute(
        select(NewsLetterModel).where(NewsLetterModel.email == user.email)
    )
       existing_subscriber = result.scalars().first()
       if not existing_subscriber:
           try:
                new_subscriber =NewsLetterModel(email=user.email)
                db.add(new_subscriber)
                await db.commit()
                await db.refresh(new_subscriber)

                try:
                    await email_service.send_welcome_email(email_to=user.email)
                    logger.info("Email Sent")
                except Exception:
                    logger.error("Email Not sent")
           except Exception:
               logger.exception("Error Adding to Database")
               await db.rollback()
               return {"message":"Server Error"}
           return {"message":"Email Added Successfully"}

       raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists")

@router.delete("/{email_id}", tags=['Newsletter'],status_code=status.HTTP_200_OK, response_model=None)
@limiter.limit("5/minute")
async def delete_subscriber(request:Request,email_id:int):
    async with get_db() as db:
        result = await db.execute(select(NewsLetterModel).where(NewsLetterModel.id == email_id))
        existing_subscriber = result.scalars().first()
        if not existing_subscriber:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Email not found")
        await db.delete(existing_subscriber)
        await db.commit()
        return "Email Deleted Successfully"


@router.put('/{email_id}', tags=['Newsletter'], response_model=None)
@limiter.limit("5/minute")
async def update_subscriber(request:Request,email_id: int, subscriber:NewsLetterUpdate):
    async with get_db() as db:
        result = await db.execute(select(NewsLetterModel).where(NewsLetterModel.id == email_id))
        existing_subscriber = result.scalars().first()
        if not existing_subscriber:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Email not found")
        existing_subscriber.email = subscriber.email

        await db.commit()
        await db.refresh(existing_subscriber)
        return "Email Updated Successfully"

@router.get('/', tags=['Newsletter'], response_model=None)
@limiter.limit("5/minute")
async def get_subscribers(request:Request):
    async with get_db() as db:
        result = await db.execute(select(NewsLetterModel))
        existing_subscribers = result.scalars().all()
        if not existing_subscribers:
            return []
        return existing_subscribers


