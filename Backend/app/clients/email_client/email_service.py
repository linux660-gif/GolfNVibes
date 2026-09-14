import logging
from pathlib import Path
from fastapi_mail import (
    FastMail,
    MessageSchema,
    ConnectionConfig,
    MessageType,
    NameEmail,
)
from datetime import date
from typing import Any
from pydantic import EmailStr, SecretStr


from app.core.config import settings

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):

        self.conf = ConnectionConfig(
            MAIL_USERNAME=settings.mail_username,
            MAIL_PASSWORD=SecretStr(settings.mail_password),
            MAIL_FROM=settings.mail_from,
            MAIL_PORT=settings.mail_port,
            MAIL_SERVER=settings.mail_server,
            MAIL_STARTTLS=settings.mail_starttls,
            MAIL_SSL_TLS=settings.mail_ssl_tls,
            USE_CREDENTIALS=settings.use_credentials,
            VALIDATE_CERTS=settings.validate_certs,
            TEMPLATE_FOLDER=Path(__file__).parent / "templates",
        )
        self.fm = FastMail(self.conf)

    async def send_email(
        self,
        subject: str,
        email_to: EmailStr,
        file_name: str,
        template_data: dict[str, str],
    ) -> bool:
        message = MessageSchema(
            subject=subject,
            recipients=[NameEmail(name="", email=email_to)],
            template_body=template_data,
            subtype=MessageType.html,
        )

        try:
            await self.fm.send_message(message, template_name=file_name)
            logger.info("Email Sent")
            return True

        except Exception:
            logger.exception("Failed to send email")
            return False

    async def send_welcome_email(self, email_to: EmailStr) -> bool:
        template_data: dict[str, list[str]] = {
            "name": email_to.split(),
        }

        message = MessageSchema(
            subject="Welcome To GolfNVibes Newsletter, You are on the List",
            recipients=[NameEmail(name="", email=email_to)],
            template_body=template_data,
            subtype=MessageType.html,
        )

        try:
            await self.fm.send_message(message, template_name="welcome.html")
            logger.info("email sent")
            return True
        except Exception:
            logger.error("email not sent")
            return False

    async def send_plan_trip_confirmation(
        self, email_to: EmailStr, destination: str, first_name: str, second_name: str, reference:str, start_date:date, end_date:date
    ) -> bool:
        template_data = {
            "reference_number": reference,
            "name": f"{first_name} {second_name}",
            "destination": destination,
            "start_date": start_date,
            "end_date": end_date,
            "email_to": email_to
        }

        message = MessageSchema(
            subject=f"Your Custom Travel For {destination} has been received",
            recipients=[NameEmail(name="", email=email_to)],
            template_body=template_data,
            subtype=MessageType.html,
        )

        try:
            await self.fm.send_message(
                message, template_name="plan_trip_confirmation.html"
            )
            logger.info("email sent")
            return True
        except Exception as e:
            logger.exception("email not sent", e)
            return False

    async def send_membership_confirmation(
        self, email_to: EmailStr, club: str, full_name: str
    ) -> bool:
        template_data = {
            "name": full_name,
            "club": club,
        }

        message = MessageSchema(
            subject=f"Welcome your Membership in {club} is Received",
            recipients=[NameEmail(name="", email=email_to)],
            template_body=template_data,
            subtype=MessageType.html,
        )

        try:
            await self.fm.send_message(
                message, template_name="membership_confirmation.html"
            )
            logger.info("email sent")
            return True
        except Exception:
            logger.error("email not sent")
            return False

    async def send_host_confirmation(
        self, email_to: EmailStr, company: str, full_name: str
    ) -> bool:
        template_data = {
            "name": full_name,
            "club": company,
        }

        message = MessageSchema(
            subject=f"Application Received: GolfNVibes Tournament Host Request",
            recipients=[NameEmail(name="", email=email_to)],
            template_body=template_data,
            subtype=MessageType.html,
        )

        try:
            await self.fm.send_message(message, template_name="host_confirmation.html")
            logger.info("email sent")
            return True
        except Exception:
            logger.error("email not sent")
            return False

    async def send_inquiry_confirmation(
        self, email_to: EmailStr, full_name: str, topic: str
    ) -> bool:
        template_data = {"name": full_name}

        message = MessageSchema(
            subject=f"Received: Your inquiry regarding {topic} ",
            recipients=[NameEmail(name="", email=email_to)],
            template_body=template_data,
            subtype=MessageType.html,
        )

        try:
            await self.fm.send_message(
                message, template_name="inquiry_confirmation.html"
            )
            logger.info("email sent")
            return True
        except Exception:
            logger.error("email not sent")
            return False

    async def send_inquiry_email(
        self, email_to: EmailStr, received_message: str
    ) -> bool:

        message = MessageSchema(
            subject=f"Inquiry ",
            recipients=[NameEmail(name="", email=email_to)],
            body=f"{received_message}",
            subtype=MessageType.plain,
        )

        try:
            await self.fm.send_message(
                message, template_name="inquiry_confirmation.html"
            )
            logger.info("email sent")
            return True
        except Exception:
            logger.error("email not sent")
            return False

    async def send_partner_confirmation(self, email_to: EmailStr, partner: str, partner_type:str) -> bool:
        template_data = {
            "organization": partner,
            "partner_type":partner_type
        }

        message = MessageSchema(
            subject=f"Welcome your Membership in  is Received",
            recipients=[NameEmail(name="", email=email_to)],
            template_body=template_data,
            subtype=MessageType.html,
        )

        try:
            await self.fm.send_message(
                message, template_name="partner_confirmation.html"
            )
            logger.info("email sent")
            return True
        except Exception:
            logger.error("email not sent")
            return False
