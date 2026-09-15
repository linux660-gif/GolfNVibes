from fastapi import APIRouter, HTTPException, status, Request
import logging


from app.schemas.inquiry_schema import InquiryCreate
from app.models.inquiries import Inquiries as InquiriesModel
from app.db.database import get_db
from app.clients.email_client.email_service import EmailService
from app.main import limiter

router = APIRouter(prefix="/api/v1/inquiry", tags=["Inquiry"])
logger = logging.getLogger(__name__)
email_service = EmailService()

#add background tasks

@router.post("/", status_code=status.HTTP_201_CREATED)
@limiter.limit(limit_value="5/hour")
async def add_inquiry(request: Request, inquiry: InquiryCreate):

    async with get_db() as db:
        new_inquiry = InquiriesModel(
            name=inquiry.name,
            email=inquiry.email,
            topic=inquiry.topic,
            message=inquiry.message,
        )
        try:
            db.add(new_inquiry)
            await db.commit()
            await db.refresh(new_inquiry)
            logger.info("Inquiry added to Database")

        except Exception:
            await db.rollback()
            logger.exception("Error adding Inquiry to database")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal server error",
            )
        try:
            # await email_service.send_inquiry_email(email_to = messageschema.company_email, received_message= messageschema.message)
            await email_service.send_inquiry_confirmation(
                email_to=inquiry.email, full_name=inquiry.name, topic=inquiry.topic
            )
            logger.info("Email Sent")

        except Exception:
            logger.exception("Failed to send confirmation email")

        return {"message": "Inquiry received successfully"}
