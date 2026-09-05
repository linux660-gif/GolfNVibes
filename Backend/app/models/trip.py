from typing import List

from sqlalchemy import JSON, Boolean, Integer, String, Text, DateTime, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.database import Base
from datetime import date, datetime,UTC




# all available Trips and their details(payment details included)
class Trip(Base):
    __tablename__ = "trips"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, index=True
    )
    title: Mapped[str] = mapped_column(String(120), index=True, nullable=False, unique=True)
    # host_id: Mapped[int] = mapped_column(
    #     ForeignKey("hosts.id"),
    #     nullable=False,
    #     index=True,
    # )
    #host: Mapped["Host"] = relationship(back_populates="events")
    date: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    location: Mapped[str] = mapped_column(String(150), index=True, nullable=False)
    stripe_price_id: Mapped[str] = mapped_column(
        String(50), index=True, nullable=False
    )
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
    trip_id:Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, index=True)
    first_name: Mapped[str] = mapped_column(String)
    last_name: Mapped[str] = mapped_column(String)
    email:Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    phone_number: Mapped[str] = mapped_column(String)
    golfers = mapped_column(Integer)
    date: Mapped[date] = mapped_column(Date, nullable=False, index=True, default=date.today())
    non_golfers: Mapped[int] = mapped_column(Integer)
    rounds: Mapped[str] = mapped_column(String)
    airport_transfers: Mapped[bool] = mapped_column(Boolean)
    flights: Mapped[bool] = mapped_column(Boolean)
    flexible_dates: Mapped[bool] = mapped_column(Boolean)
    experiences = mapped_column(JSON, default=list)
    hotel_id: Mapped[str] = mapped_column(ForeignKey("hotel_categories.id"))
    destination_id: Mapped[str] = mapped_column(ForeignKey("destinations.id"))
    other_destination: Mapped[str] = mapped_column(String, nullable=True )
    additional_specifications: Mapped[str] = mapped_column(Text, nullable=True)
    continent_id: Mapped[str] = mapped_column(ForeignKey("continents.id"))
    budget: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),default=datetime.now(UTC))
