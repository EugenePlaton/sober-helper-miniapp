from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field, field_validator
from typing import Any


class Settings(BaseSettings):
    app_name: str = Field(default="Sober Helper API")
    debug: bool = Field(default=True)
    backend_cors_origins: list[str] = Field(default_factory=lambda: ["http://localhost:5173", "http://localhost:4173"])
    database_url: str = Field(default="postgresql+psycopg://user:password@localhost:5432/sober_helper")
    access_token_expire_minutes: int = 60 * 24
    refresh_token_expire_minutes: int = 60 * 24 * 7
    secret_key: str = "changeme"
    telegram_bot_token: str | None = None
    openrouter_api_key: str | None = None
    openrouter_base_url: str = "https://openrouter.ai/api/v1"
    openrouter_model: str = "openrouter/auto"
    chat_summary_message_limit: int = 20
    free_chat_daily_limit: int = 30
    free_checkin_daily_limit: int = 3

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @field_validator("backend_cors_origins", mode="before")
    @classmethod
    def split_cors_origins(cls, v: Any) -> Any:
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v


def get_settings() -> Settings:
    return Settings()
