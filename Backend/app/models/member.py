from datetime import datetime, UTC
from typing import List

from sqlalchemy import DateTime, ForeignKey, String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship


from app.db.database import Base


class Club(Base):
    __tablename__ = "clubs"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, index=True
    )
    name: Mapped[str] = mapped_column(
        String(300), unique=True, index=True, nullable=False
    )
    members: Mapped[List[Members]] = relationship(
        back_populates="club", cascade="all, delete-orphan"
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(UTC)
    )


class Members(Base):
    __tablename__ = "members"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, index=True
    )
    full_name: Mapped[str] = mapped_column(String, nullable=False, index=True)
    email: Mapped[str] = mapped_column(String, nullable=False, index=True, unique=True)
    handicap: Mapped[str] = mapped_column(String, nullable=False)
    club_id: Mapped[int] = mapped_column(ForeignKey("clubs.id"))
    vision: Mapped[str] = mapped_column(String, nullable=False)
    club: Mapped["Club"] = relationship(back_populates="members")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(UTC)
    )
