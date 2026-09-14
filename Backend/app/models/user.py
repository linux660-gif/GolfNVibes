
from sqlalchemy import Integer, String, Boolean
from sqlalchemy.orm import mapped_column, Mapped

from app.db.database import Base

class Users(Base):
    __tablename__ = "users"
    id:Mapped[int] = mapped_column(Integer, primary_key=True)
    email:Mapped[str] = mapped_column(String, unique=True, nullable=False)
    hashed_password:Mapped[str] = mapped_column(String, nullable=False)
    is_active:Mapped[bool] = mapped_column(Boolean, default=True)
    role:Mapped[str] = mapped_column(String, nullable=False)