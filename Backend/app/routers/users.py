from fastapi import APIRouter, Depends,status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from typing import List

from app.db.database import get_db
from app.models.user import Users
from app.schemas.users_schema import UserCreate,UserResponse,Token
from app.auth import  hash_password,verify_password,create_access_token,CurrentUser

router = APIRouter(prefix="/api/v1/users", tags=["Users"])

@router.post("/")
async def create_user(user: UserCreate, current_user:CurrentUser):
    async with get_db() as db:
        result = await db.execute(select(Users).where(Users.email == user.email))
        existing_user = result.scalars().first()
        if existing_user:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail="User already exists")
        hashed_password = hash_password(user.password)
        new_user = Users(email = user.email,hashed_password = hashed_password,is_active = user.is_active, role = user.role)
        try:
            db.add(new_user)
            await db.commit()
            await db.refresh(new_user)
            return {"message":"User created successfully"}
        except Exception:
            await db.rollback()
            return {"message":"Something went wrong"}


@router.get("/me")
async def get_current_user(current_user:CurrentUser):
    return current_user


@router.get("/", response_model=List[UserResponse])
async def get_users(current_user:CurrentUser):
    async with get_db() as db:
        result = await db.execute(select(Users))
        users = result.scalars().all()
        if not users:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User does not exist")
        return users

@router.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    async with get_db() as db:
        result = await db.execute(select(Users).where(Users.email == form_data.username))
        user = result.scalars().first()
        if not user or not verify_password(form_data.password, user.hashed_password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password",headers={"WWW-Authenticate": "Bearer"})
        user_id= str(user.id)
        access_token = create_access_token(
            data={"sub": user_id,"role":user.role}
        )
        return Token(access_token=access_token,token_type="Bearer")




