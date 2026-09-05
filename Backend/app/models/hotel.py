
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base

class HotelCategory(Base):
    __tablename__ = 'hotel_categories'
    id:Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, index=True)
    name:Mapped[str] = mapped_column(String, nullable=False, index=True, unique=True)