from app.clients.mpesa import MpesaClient
from app.models.payments import TournamentPayment
from fastapi import APIRouter, HTTPException, Request, status
from sqlalchemy import select
import logging
from datetime import datetime,UTC


from app.schemas.tournament_schema import TournamentHost as TournamentHostSchema,TournamentBook as TournamentBookSchema
from app.db.database import get_db
from app.models.tournament import (
    Host as TournamentHostModel,
    Classification as ClassificationModel,
    Guest as GuestModel,
    Tournament as TournamentModel,
)
from app.models.payments import TournamentPayment,PaymentMethod,MpesaPayment
from app.clients.email_client.email_service import EmailService
from app.main import limiter


router = APIRouter(prefix="/api/v1/tournament", tags=["Tournament"])
logger = logging.getLogger(__name__)
mpesa = MpesaClient()
email_service = EmailService()


@router.post("/host/", status_code=status.HTTP_201_CREATED)
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
@router.post("/book/")
@limiter.limit("5/minute")
async def book_tournament(request: Request, tournament: TournamentBookSchema):
    async with get_db() as db:
        result = await db.execute(select(TournamentModel).where(TournamentModel.tournament_reference == tournament.tournament_reference))
        tournament_record = result.scalars().first()
        if not tournament_record:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Tournament Not Found")
        if tournament_record.spots <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,detail="No spots Available"
            )
        if tournament_record.amount != tournament.amount:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid Amount")
        result = await db.execute(select(PaymentMethod).where(PaymentMethod.id == tournament.payment_method_id))
        payment_method_record = result.scalars().first()


        if not payment_method_record:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Payment Method Not Found")

        if payment_method_record.name == "mpesa":
            CheckoutRequestID = await mpesa.initiate_stk_push(phone_number=tournament.phone_number, amount = tournament_record.amount)
            new_mpesa_payment = MpesaPayment(mpesa_receipt="",phone_number=tournament.phone_number,checkout_id=CheckoutRequestID,amount=tournament.amount, transaction_date =datetime.now(UTC))
            db.add(new_mpesa_payment)
            await db.commit()
            await db.refresh(new_mpesa_payment)

        if payment_method_record.name == "stripe":
            pass

        if payment_method_record.name == "paypal":
            pass


        new_payment = TournamentPayment(
            full_name = tournament.full_name,
            email = tournament.email,
            phone_number = tournament.phone_number,
            amount = tournament.amount,
            payment_method_id = tournament.payment_method_id,
            tournament_reference = tournament.tournament_reference,
            created_at= datetime.now(UTC),
            status = "PENDING",
            checkout_id = tournament.checkout_id
        )
        db.add(new_payment)
        await db.commit()
        await db.refresh(new_payment)



