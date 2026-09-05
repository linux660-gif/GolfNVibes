from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine, AsyncSession
from sqlalchemy.orm import  DeclarativeBase
from contextlib import asynccontextmanager
from app.core.config import settings

SQLALCHEMY_DATABASE_URL = settings.database_url

engine = create_async_engine(url=SQLALCHEMY_DATABASE_URL, echo=True, future = True)

AsyncSessionLocal = async_sessionmaker(bind=engine,class_=AsyncSession, expire_on_commit=False)

class Base(DeclarativeBase):
    pass


@asynccontextmanager
async def get_db():
    async with AsyncSessionLocal() as db:
        try:
            yield db
        except Exception as e:
            await db.rollback()
            raise e
        finally:
            await db.close()



