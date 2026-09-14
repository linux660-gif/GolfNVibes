from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

# from redis import Redis
from fastapi.templating import Jinja2Templates
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)


from app.routers import (
    inquiries,
    newsletter,
    paypal,
    trip,
    members,
    email,
    tournament,
    partner,
    hotel,
    continent,
    classification,
    club,
    guest,
    destination,
    users,
)
from app.db.database import Base, engine
from app.core.logging_config import setup_logging

setup_logging()


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(
    exc_class_or_status_code=RateLimitExceeded, handler=_rate_limit_exceeded_handler
)

# app.mount("/static", StaticFiles(directory="static"), name='static')

templates = Jinja2Templates(directory="app/templates")
allow_origins = [
    "https://golfnvibes.com",
    "https://www.golfnvibes.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(paypal.router)
app.include_router(trip.router)
app.include_router(newsletter.router)
app.include_router(members.router)
app.include_router(email.router)
app.include_router(tournament.router)
app.include_router(partner.router)
app.include_router(inquiries.router)
app.include_router(hotel.router)
app.include_router(guest.router)
app.include_router(destination.router)
app.include_router(continent.router)
app.include_router(club.router)
app.include_router(classification.router)
#app.include_router(stripe.router)
app.include_router(users.router)


@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse(request, "button.html")


@app.get("/success")
async def success(request: Request):
    return templates.TemplateResponse(request, "success.html")


@app.get("/cancel")
async def cancel(request: Request):
    return templates.TemplateResponse(request, "cancel.html")
