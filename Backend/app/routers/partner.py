from fastapi import APIRouter, HTTPException, Request, status
from sqlalchemy import select
import logging
from datetime import UTC,datetime
from typing import List



from app.schemas.partner_schema import PartnerCreate as PartnerSchema, PartnerCategory,PartnerCategoryResponse
from app.db.database import get_db
from app.models.partner import Partner as PartnerModel, PartnerCategory as PartnerCategoryModel
from app.clients.email_client.email_service import EmailService
from app.main import limiter
from app.auth import CurrentUser

router = APIRouter(prefix="/api/v1/partner", tags=["Partner"])
logger = logging.getLogger(__name__)
email_service = EmailService()


@router.post("/", status_code=status.HTTP_201_CREATED)
@limiter.limit("2/minute")
async def add_partner(request:Request,partner: PartnerSchema):
    async with get_db() as db:
        result = await db.execute(
            select(PartnerModel).where(PartnerModel.email == partner.email)
        )
        existing_partner = result.scalars().first()

        if not existing_partner:
            result = await db.execute(select(PartnerCategoryModel).where(PartnerCategoryModel.id == partner.partner_type_id))
            partner_category_record = result.scalars().first()

            if not partner_category_record:
                 raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Partner ID")

            try:
                partner_type = partner_category_record.name
                new_partner = PartnerModel(
                    organization=partner.organization,
                    email=partner.email,
                    partner_type_id=partner.partner_type_id,
                    details=partner.details,
                )
                db.add(new_partner)
                await db.commit()
                await db.refresh(new_partner)
                logger.info("Partner Added")
            except Exception:
                await db.rollback()
                logger.exception("Server Error")
                return {"message": "Server Error"}
            try:

                await email_service.send_partner_confirmation(
                        email_to=partner.email, partner=partner.organization,partner_type=partner_type
                    )
                logger.info("Confirmation Email Sent")
            except Exception:
                    logger.error("Confirmation Email not Sent")
                
            return {"message": "Partner Successfully Added"}

            

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Partner  Already Exists"
        )

@router.post("/category/", status_code=status.HTTP_201_CREATED)
async def create_partner_category(request:Request,partner_category: PartnerCategory,current_user:CurrentUser):
    async with get_db() as db:
        result = await db.execute(select(PartnerCategoryModel).where(PartnerCategoryModel.name == partner_category.name))
        existing_partner = result.scalars().first()
        if existing_partner:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Partner  Already Exists")
        try:
            new_partner = PartnerCategoryModel(name= partner_category.name, created_at=datetime.now(UTC))
            db.add(new_partner)
            await db.commit()
            await db.refresh(new_partner)

        except Exception:
            await db.rollback()
            logger.exception("Error adding partner category to database")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Server Error")
        return {"message": "Partner  Successfully Added"}


@router.get("/category/", status_code=status.HTTP_200_OK, response_model=List[PartnerCategoryResponse])
@limiter.limit("5/minute")
async def get_partner_categories(request: Request):
    async with get_db() as db:
        result = await db.execute(select(PartnerCategoryModel))
        existing_clubs = result.scalars().all()
        if not existing_clubs:
            return []
        return existing_clubs