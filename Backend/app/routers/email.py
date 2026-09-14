from fastapi import APIRouter, status
import logging


from app.clients.email_client.email_service import EmailService
from app.clients.email_client.schema import EmailBase as EmailBaseSchema
from app.auth import CurrentUser



router = APIRouter(prefix="/email", tags=["Email"])
logger = logging.getLogger(__name__)
email_service = EmailService()



@router.post("/", status_code=status.HTTP_200_OK)
async def send_email(email: EmailBaseSchema, current_user:CurrentUser):
    try:
        logger.info(f"Sending email")
        await email_service.send_welcome_email(email_to=email.email)
        logger.info("Email Sent")
        return {"message": "success"}
    except Exception:
        logger.exception("Email Not Sent")
        return {"message": "failed"}
