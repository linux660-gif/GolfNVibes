from fastapi import APIRouter, HTTPException, Request, status
from sqlalchemy import select
import logging


from app.schemas.partner_schema import PartnerCreate as PartnerSchema
from app.db.database import get_db
from app.models.partner import Partner as PartnerModel, PartnerCategory as PartnerCategoryModel
from app.clients.email_client.email_service import EmailService
from app.main import limiter

router = APIRouter(prefix="/api/v1/partner", tags=["Partner"])
logger = logging.getLogger(__name__)
email_service = EmailService()


@router.post("/", status_code=status.HTTP_201_CREATED)
@limiter.limit("2/minute")
async def add_partner(request:Request,partner: PartnerSchema):
    async with get_db() as db:
        result = await db.execute(
            select(PartnerModel.email).where(PartnerModel.email == partner.email)
        )
        existing_host = result.scalars().first()

        if not existing_host:
            result = await db.execute(select(PartnerCategoryModel).where(PartnerCategoryModel.id == partner.partner_type_id))
            partner_category_record = result.scalars().first()
            if not partner_category_record:
                 raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Partner ID")
            try:
                new_partner = PartnerModel(
                    organization=partner.organization,
                    email=partner.email,
                    partner_type=partner.partner_type_id,
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
                        email_to=partner.email, partner=partner.organization
                    )
                logger.info("Confirmation Email Sent")
            except Exception:
                    logger.error("Confirmation Email not Sent")
                
            return {"message": "Partner Successfully Added"}

            

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Partner  Already Exists"
        )
