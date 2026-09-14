from typing import Annotated, Any
from datetime import timedelta, datetime, UTC

from fastapi import Depends,HTTPException,status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from pwdlib import PasswordHash
import jwt

from app.core.config import settings
from app.db.database import get_db
from app.models.user import Users

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/users/token")
password_hash = PasswordHash.recommended()


def hash_password(password:str)->str:
    return password_hash.hash(password)

def verify_password(plain_password:str, hashed_password:str)->bool:
    return password_hash.verify(plain_password, hashed_password)

def create_access_token(data:dict)->str:
    to_encode = data.copy()
    expire_time = datetime.now(UTC) + timedelta(minutes=settings.access_token_expire_time_minutes)

    to_encode.update({"exp":expire_time})

    access_token = jwt.encode(
        payload=to_encode, 
        algorithm=settings.algorithm,
        key=settings.access_token_secret_key,     
    ) 
    return access_token

def verify_access_token(access_token:str)->dict:
    try:
        payload = jwt.decode(
            jwt=access_token,
            key=settings.access_token_secret_key,
            algorithms=settings.algorithm,
            options={"require":["exp","sub","role"]}
        )
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise
    except jwt.InvalidTokenError:
        raise
    

async def get_current_user(token:Annotated[str, Depends(oauth2_scheme)]):
    user_id = verify_access_token(token)
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    try:
        user_id_int = int(user_id)

    except ValueError or TypeError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
                )
    async with get_db() as db:

        result = await db.execute(select(Users).where(Users.id == user_id_int))
        user = result.scalars().first()
        if not result:
            raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="User not Found",
                    headers={"WWW-Authenticate": "Bearer"},
                        )
        if  not user.is_active:
            raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not Active",
            headers={"WWW-Authenticate": "Bearer"}
            )
        if not user.role == "admin":
            raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not Found",
            headers={"WWW-Authenticate": "Bearer"}
            )

    return user


CurrentUser = Annotated[Users, Depends(get_current_user)]

