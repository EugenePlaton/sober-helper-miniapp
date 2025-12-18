from pydantic import BaseModel, field_validator, ConfigDict

from app.schemas.common import User


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RegisterRequest(BaseModel):
    email: str
    password: str
    language: str | None = None

    @field_validator("password")
    @classmethod
    def password_length(cls, v: str) -> str:
        if len(v) > 100:
            raise ValueError("Password too long (max 100 characters)")
        if len(v.encode("utf-8")) > 72:
            raise ValueError("Password too long for bcrypt (try <=64 characters)")
        return v


class LoginRequest(BaseModel):
    email: str
    password: str

    @field_validator("password")
    @classmethod
    def password_length(cls, v: str) -> str:
        if len(v) > 100:
            raise ValueError("Password too long (max 100 characters)")
        if len(v.encode("utf-8")) > 72:
            raise ValueError("Password too long for bcrypt (try <=64 characters)")
        return v


class RefreshRequest(BaseModel):
    refresh_token: str


class TelegramAuthRequest(BaseModel):
    id: int
    hash: str
    auth_date: int
    first_name: str | None = None
    last_name: str | None = None
    username: str | None = None
    photo_url: str | None = None


class AuthResponse(BaseModel):
    user: User
    tokens: Token

    model_config = ConfigDict(from_attributes=True)
