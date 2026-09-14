from typing import List

from sqlalchemy import ForeignKey, String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship



from app.db.database import Base


class Continent(Base):
    __tablename__ = "continents"
    id:Mapped[int] = mapped_column(Integer, autoincrement=True, index=True, primary_key=True)
    name:Mapped[str] = mapped_column(String(255), index=True, unique=True)
    destinations:Mapped[List["Destination"]] = relationship(back_populates="continent")
    trips:Mapped[List["CustomTrip"]] = relationship(back_populates='continent')

class Destination(Base):
    __tablename__ = "destinations"
    id:Mapped[int] = mapped_column(Integer, autoincrement=True, index=True, primary_key=True)
    name:Mapped[str] = mapped_column(String(255), index=True, unique=True)
    continent_id:Mapped[int] = mapped_column(ForeignKey("continents.id"))
    continent:Mapped[List["Continent"]] = relationship(back_populates="destinations")
    trips:Mapped[List["CustomTrip"]] = relationship(back_populates='destination')
    