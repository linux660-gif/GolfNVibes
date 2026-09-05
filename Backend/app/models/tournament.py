from typing import List
from sqlalchemy import Integer, String, Text, DateTime, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import UTC, datetime, date


from app.db.database import Base


class Guest(Base):
    __tablename__ = "guests"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True, autoincrement=True
    )
    name: Mapped[str] = mapped_column(
        String(150), index=True, nullable=False, unique=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(UTC)
    )
    hosts: Mapped[List["Host"]] = relationship(back_populates="guest")


class Classification(Base):
    __tablename__ = "classification"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True, autoincrement=True
    )
    name: Mapped[str] = mapped_column(
        String(20), index=True, nullable=False, unique=True
    )

    hosts: Mapped[list["Host"]] = relationship(back_populates="classification")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(UTC)
    )


# list of all tournaments and their details
class Tournament(Base):
    __tablename__ = "tournaments"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, index=True
    )
    name: Mapped[str] = mapped_column(
        String(100), index=True, nullable=False, unique=True
    )
    date: Mapped[date] = mapped_column(
        Date, nullable=False, index=True, default=datetime.now(UTC)
    )
    location: Mapped[str] = mapped_column(String(20), index=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    stripe_product_id: Mapped[str] = mapped_column(
        String(255), index=True, nullable=True
    )
    amount: Mapped[str] = mapped_column(String, index=True, nullable=False, default="1")
    spots: Mapped[int] = mapped_column(Integer, index=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(UTC)
    )
    calendar_events: Mapped[list["EventsCalendar"]] = relationship(
        "EventsCalendar",
        back_populates="tournament",
    )
    img_url: Mapped[str] = mapped_column(String(55), nullable=True)


# list of all submited host tournament requests
class Host(Base):
    __tablename__ = "hosts"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, index=True
    )
    full_name: Mapped[str] = mapped_column(String(150), index=True, nullable=False)
    email: Mapped[str] = mapped_column(
        String(30), index=True, nullable=False, unique=True
    )

    company: Mapped[str] = mapped_column(String(150), index=True, nullable=False)
    classification_id: Mapped[int] = mapped_column(
        ForeignKey("classification.id"), nullable=False
    )
    guest_id: Mapped[int] = mapped_column(ForeignKey("guests.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(UTC)
    )
    vision: Mapped[str] = mapped_column(Text, nullable=False)
    guest: Mapped["Guest"] = relationship(back_populates="hosts")
    classification: Mapped["Classification"] = relationship(back_populates="hosts")
    # events: Mapped[list["Event"]] = relationship(back_populates="host") list of events hosted by single host


class Results(Base):
    __tablename__ = "results"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, index=True
    )
    player: Mapped[str] = mapped_column(String(120), index=True, nullable=False)


