from sqlalchemy import Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.database import Base
from datetime import datetime, UTC
from typing import List


class PaymentMethod(Base):
    __tablename__ = "payment_method"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, index=True
    )
    method: Mapped[str] = mapped_column(
        String(50), index=True, nullable=False, unique=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(UTC)
    )
    tournament_payments:Mapped[List["TournamentPayment"]] = relationship(back_populates='payment_method')
    trip_payments: Mapped[List["TripPayment"]] = relationship(back_populates='payment_method')


class TournamentPayment(Base):
    __tablename__ = "tournament_payments"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, index=True
    )
    full_name: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    email: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    phone_number:Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    payment_method_id: Mapped[str] = mapped_column(ForeignKey("payment_method.id"))
    payment_for_id: Mapped[int] = mapped_column(ForeignKey("tournaments.id"))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(UTC)
    )
    status: Mapped[str] = mapped_column(String(20), index=True, nullable=False)
    completed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(UTC)
    )
    tournament_payment:Mapped["PaymentMethod"] = relationship(back_populates="tournament_payments")


class TripPayment(Base):
    __tablename__ = "trip_payments"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, index=True
    )
    amount: Mapped[str] = mapped_column(String, index=True, nullable=False, default="1")
    full_name: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    email: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    payment_method_id: Mapped[str] = mapped_column(ForeignKey("payment_method.id"))
    payment_for_id: Mapped[int] = mapped_column(ForeignKey("trips.id"))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(UTC)
    )
    status: Mapped[str] = mapped_column(String(20), index=True, nullable=False)
    completed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(UTC)
    )
    trip_payment:Mapped["PaymentMethod"] = relationship(back_populates="trip_payments")

