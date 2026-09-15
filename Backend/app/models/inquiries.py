from datetime import datetime, UTC

from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base


class Inquiries(Base):
    __tablename__ = "inquiries"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String,
        nullable=False,
        index=True,
    )

    email: Mapped[str] = mapped_column(
        String,
        nullable=False,
        index=True,
    )

    topic: Mapped[str] = mapped_column(
        String,
        nullable=False,
        index=True,
    )

    submited_time: Mapped[datetime] = mapped_column(
        DateTime(timezone=False),
        nullable=False,
        default=lambda: datetime.now(UTC).replace(tzinfo=None),
    )

    message: Mapped[str] = mapped_column(
        String,
        nullable=False,
    )