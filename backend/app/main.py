from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import health, users
from app import db
from app.core.config import get_settings
from app.models.base import Base

settings = get_settings()
app = FastAPI(title=settings.app_name, debug=settings.debug)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.backend_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(users.router)


@app.on_event("startup")
def create_tables() -> None:
    Base.metadata.create_all(bind=db.engine)


@app.get("/", tags=["root"])
def root():
    return {"message": "Welcome to the Sober Helper API", "docs": "/docs"}
