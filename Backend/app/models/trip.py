from typing import List

from sqlalchemy import (
    ARRAY,
    Boolean,
    Integer,
    String,
    Text,
    DateTime,
    Date,
    ForeignKey,
    JSON,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.database import Base
from datetime import date, datetime, UTC


# all available Trips and their details(payment details included)
class Trip(Base):
    __tablename__ = "trips"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, index=True
    )
    title: Mapped[str] = mapped_column(
        String(120), index=True, nullable=False, unique=True
    )
    date: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    location: Mapped[str] = mapped_column(String(150), index=True, nullable=False)
    stripe_price_id: Mapped[str] = mapped_column(String(50), index=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    stripe_product_id: Mapped[str] = mapped_column(
        String(255), index=True, nullable=True
    )
    amount: Mapped[str] = mapped_column(String, index=True, nullable=False, default="1")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(UTC)
    )
    spots: Mapped[int] = mapped_column(Integer, index=True, nullable=False)
    calendar_events: Mapped[list["EventsCalendar"]] = relationship(
        "EventsCalendar",
        back_populates="trip",
    )
    img_url: Mapped[str] = mapped_column(String(500), nullable=True)


class CustomTrip(Base):
    __tablename__ = "plan_trip"
    trip_id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, index=True
    )
    first_name: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    email: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    phone_number: Mapped[str] = mapped_column(String(20), nullable=False)
    golfers: Mapped[int] = mapped_column(Integer, nullable=False)
    start_date: Mapped[date] = mapped_column(
        Date, nullable=False, index=True, default=date.today()
    )
    end_date: Mapped[date] = mapped_column(
            Date, nullable=False, index=True, default=date.today()
        )
    non_golfers: Mapped[int] = mapped_column(Integer, nullable=False)
    rounds: Mapped[int] = mapped_column(Integer, nullable=False)
    airport_transfers: Mapped[bool] = mapped_column(Boolean, nullable=False)
    flights: Mapped[bool] = mapped_column(Boolean, nullable=False)
    flexible_dates: Mapped[bool] = mapped_column(Boolean, nullable=False)
    experiences: Mapped[List[str]] = mapped_column(JSON, nullable=True)
    hotel_id: Mapped[int] = mapped_column(ForeignKey("hotel_categories.id"))
    destination_id: Mapped[int] = mapped_column(
        ForeignKey("destinations.id"), nullable=True
    )
    other_destination: Mapped[str] = mapped_column(String, nullable=True)
    additional_specifications: Mapped[str] = mapped_column(Text, nullable=True)
    reference_number:Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    continent_id: Mapped[int] = mapped_column(
        ForeignKey("continents.id"), nullable=True
    )
    budget: Mapped[str] = mapped_column(String, nullable=False)
    continent: Mapped["Continent"] = relationship(back_populates="trips")
    destination: Mapped["Destination"] = relationship(back_populates="trips")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(UTC)
    )
