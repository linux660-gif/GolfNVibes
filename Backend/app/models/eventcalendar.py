from typing import Optional

from sqlalchemy import Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base
from app.models.tournament import Tournament
from app.models.trip import Trip


class EventsCalendar(Base):
    __tablename__ = "eventscalendar"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
        index=True,
    )

    trip_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("trips.id"),
        nullable=True,
    )

    tournament_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("tournaments.id"),
        nullable=True,
    )

    trip: Mapped[Optional["Trip"]] = relationship(
        back_populates="calendar_events"
    )

    tournament: Mapped[Optional["Tournament"]] = relationship(
        back_populates="calendar_events"
    )