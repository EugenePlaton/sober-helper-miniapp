from datetime import datetime

from app.core.celery_app import celery
from app.core.config import get_settings
from app import db
from app.models import entities

settings = get_settings()


@celery.task
def send_daily_checkin_reminders() -> int:
    """
    Dummy reminder dispatcher: logs eligible users count.
    Extend: integrate Telegram push / email / push service.
    """
    with db.SessionLocal() as session:
        users = session.query(entities.User).filter(entities.User.is_active == True).all()  # noqa: E712
        # Placeholder: here you would send a message via bot/email/push
        return len(users)


@celery.task
def send_motivation_broadcast() -> str:
    now = datetime.utcnow()
    # Placeholder logic
    return f"Motivation broadcast triggered at {now.isoformat()}"
