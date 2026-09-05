from datetime import datetime,UTC
from typing import List

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.database import Base


class PartnerCategory(Base):
    __tablename__ = "partner_categories"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True, autoincrement=True
    )
    name: Mapped[str] = mapped_column(String(20), index=True, nullable=False, unique=True)
    partners: Mapped[List["Partner"]] = relationship(back_populates="partner_category")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.now(UTC)
    )


class Partner(Base):
    __tablename__ = "partners"
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True, index=True
    )
    organization: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    partner_type_id: Mapped[int] = mapped_column(ForeignKey('partner_categories.id'))
    details: Mapped[str] = mapped_column(String)
    partner_category: Mapped["PartnerCategory"] = relationship(back_populates="partners")
    created_at: Mapped[datetime] = mapped_column(
            DateTime(timezone=True), default=datetime.now(UTC)
        )
