from datetime import date, datetime
from pydantic import BaseModel


class Timestamped(BaseModel):
    created_at: datetime | None = None

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str | None = None
    telegram_id: str | None = None
    language: str | None = None
    dependency_type: str | None = None
    quit_date: date | None = None
    motivation: str | None = None
    goal: str | None = None
    assistant_persona: str | None = None

    class Config:
        orm_mode = True


class UserCreate(UserBase):
    password: str | None = None


class User(UserBase, Timestamped):
    id: int
    is_active: bool
    is_superuser: bool


class Health(BaseModel):
    status: str
