from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import health, users
from app.core.config import get_settings

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


@app.get("/", tags=["root"])
def root():
    return {"message": "Welcome to the Sober Helper API", "docs": "/docs"}
