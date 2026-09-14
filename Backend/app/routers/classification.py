from typing import List

from fastapi import APIRouter, HTTPException, status, Request
from sqlalchemy import select
import logging


from app.db.database import get_db
from app.schemas.classification_schema import Classification as ClassificationSchema, ClassificationResponse
from app.models.tournament import Classification as ClassificationModel
from app.main import limiter
from app.auth import CurrentUser


router = APIRouter(prefix="/api/v1/tournament/classification", tags=["Classification"])
logger = logging.getLogger(name=__name__)



@router.post("/", status_code=status.HTTP_201_CREATED)
@limiter.limit("2/minute")
async def add_Classification(request:Request, ClassificationSchema:ClassificationSchema, current_user:CurrentUser):
    async with get_db() as db:
        result = await db.execute(select(ClassificationModel).where(ClassificationModel.name == ClassificationSchema.name))
        existing_classification = result.scalars().all()
        if not existing_classification:
            try:
                new_classification = ClassificationModel(name= ClassificationSchema.name)
                db.add(new_classification)
                await db.commit()
                await db.refresh(new_classification)
                logger.info("Classification Created")
                return {"message":"Classification Created Successfully"}
            except Exception:
                logger.exception("Error Adding Classification to Database")
                raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Server Error")
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Classification already exists")


@router.get("/", status_code=status.HTTP_200_OK, response_model=List[ClassificationResponse])
@limiter.limit("5/minute")
async def get_classification(request:Request):
    async with get_db() as db:
        result = await db.execute(select(ClassificationModel))
        existing_classifications = result.scalars().all()
        if not existing_classifications:
            return []
        return existing_classifications