from datetime import datetime, date
from pydantic import BaseModel


class HabitBase(BaseModel):
    type: str
    description: str | None = None

    class Config:
        orm_mode = True


class HabitCreate(HabitBase):
    pass


class HabitUpdate(BaseModel):
    type: str | None = None
    description: str | None = None


class Habit(HabitBase):
    id: int
    user_id: int


class CheckInBase(BaseModel):
    mood: int | None = None
    craving_level: int | None = None
    triggers: str | None = None
    help_text: str | None = None
    notes: str | None = None
    slipped: bool = False

    class Config:
        orm_mode = True


class CheckInCreate(CheckInBase):
    pass


class CheckIn(CheckInBase):
    id: int
    user_id: int
    created_at: datetime | None = None


class JournalBase(BaseModel):
    content: str

    class Config:
        orm_mode = True


class JournalCreate(JournalBase):
    pass


class Journal(JournalBase):
    id: int
    user_id: int
    created_at: datetime | None = None


class SettingsBase(BaseModel):
    theme: str | None = "light"
    notifications_enabled: bool | None = True
    language: str | None = "en"

    class Config:
        orm_mode = True


class Settings(SettingsBase):
    id: int
    user_id: int


class SubscriptionBase(BaseModel):
    plan: str = "free"
    limits: str | None = None
    active: bool = True

    class Config:
        orm_mode = True


class Subscription(SubscriptionBase):
    id: int
    user_id: int


class ChatMessageBase(BaseModel):
    role: str
    content: str
    assistant_type: str | None = None

    class Config:
        orm_mode = True


class ChatMessageCreate(ChatMessageBase):
    pass


class ChatMessage(ChatMessageBase):
    id: int
    user_id: int
    created_at: datetime | None = None


class ChatSummaryBase(BaseModel):
    summary: str | None = None

    class Config:
        orm_mode = True


class ChatSummary(ChatSummaryBase):
    id: int
    user_id: int
    updated_at: datetime | None = None
