from datetime import datetime

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.models import entities

settings = get_settings()


def get_or_create_subscription(session: Session, user_id: int) -> entities.Subscription:
    subscription = (
        session.query(entities.Subscription)
        .filter(entities.Subscription.user_id == user_id)
        .first()
    )
    if not subscription:
        subscription = entities.Subscription(user_id=user_id, plan="free", active=True)
        session.add(subscription)
        session.commit()
        session.refresh(subscription)
    return subscription


def _is_pro(subscription: entities.Subscription) -> bool:
    return subscription.plan.lower() == "pro" and subscription.active


def enforce_chat_limit(session: Session, user: entities.User) -> None:
    subscription = get_or_create_subscription(session, user.id)
    if _is_pro(subscription):
        return

    today = datetime.utcnow().date()
    start_of_day = datetime.combine(today, datetime.min.time())
    count_today = (
        session.query(entities.ChatHistory)
        .filter(
            entities.ChatHistory.user_id == user.id,
            entities.ChatHistory.created_at >= start_of_day,
        )
        .count()
    )
    if count_today >= settings.free_chat_daily_limit:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Free plan chat limit reached. Upgrade to continue.",
        )


def enforce_checkin_limit(session: Session, user: entities.User) -> None:
    subscription = get_or_create_subscription(session, user.id)
    if _is_pro(subscription):
        return

    today = datetime.utcnow().date()
    start_of_day = datetime.combine(today, datetime.min.time())
    count_today = (
        session.query(entities.CheckIn)
        .filter(
            entities.CheckIn.user_id == user.id,
            entities.CheckIn.created_at >= start_of_day,
        )
        .count()
    )
    if count_today >= settings.free_checkin_daily_limit:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Free plan check-in limit reached. Upgrade to continue.",
        )
