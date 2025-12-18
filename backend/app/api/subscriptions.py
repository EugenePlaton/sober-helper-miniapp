from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import db
from app.dependencies.auth import get_current_user
from app.models import entities
from app.schemas import resources

router = APIRouter(prefix="/subscriptions", tags=["subscriptions"])


@router.get("", response_model=resources.Subscription)
def get_subscription(
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    subscription = (
        session.query(entities.Subscription)
        .filter(entities.Subscription.user_id == current_user.id)
        .first()
    )
    if not subscription:
        subscription = entities.Subscription(user_id=current_user.id, plan="free", active=True)
        session.add(subscription)
        session.commit()
        session.refresh(subscription)
    return subscription


@router.put("", response_model=resources.Subscription)
def update_subscription(
    payload: resources.SubscriptionBase,
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    subscription = (
        session.query(entities.Subscription)
        .filter(entities.Subscription.user_id == current_user.id)
        .first()
    )
    if not subscription:
        subscription = entities.Subscription(user_id=current_user.id)
        session.add(subscription)

    subscription.plan = payload.plan or subscription.plan
    if payload.limits is not None:
        subscription.limits = payload.limits
    if payload.active is not None:
        subscription.active = payload.active

    session.commit()
    session.refresh(subscription)
    return subscription
