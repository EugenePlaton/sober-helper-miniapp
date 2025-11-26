from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    app_name: str = Field(default="Sober Helper API")
    debug: bool = Field(default=True)
    backend_cors_origins: list[str] = Field(default_factory=lambda: ["*"])
    database_url: str = Field(default="postgresql+psycopg://user:password@localhost:5432/sober_helper")
    access_token_expire_minutes: int = 60 * 24
    secret_key: str = "changeme"
    openrouter_api_key: str | None = None

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")


def get_settings() -> Settings:
    return Settings()
