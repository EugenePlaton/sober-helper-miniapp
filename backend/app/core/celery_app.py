import os

from celery import Celery

from app.core.config import get_settings

settings = get_settings()

celery = Celery(
    "sober_helper",
    broker=os.getenv("CELERY_BROKER_URL", "redis://redis:6379/0"),
    backend=os.getenv("CELERY_RESULT_BACKEND", "redis://redis:6379/0"),
)
celery.conf.timezone = "UTC"
celery.conf.update(task_serializer="json", result_serializer="json", accept_content=["json"])
