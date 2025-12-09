from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import db
from app.dependencies.auth import get_current_user
from app.models import entities
from app.schemas import resources

router = APIRouter(prefix="/settings", tags=["settings"])


@router.get("", response_model=resources.Settings)
def get_settings(
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    settings = (
        session.query(entities.Settings)
        .filter(entities.Settings.user_id == current_user.id)
        .first()
    )
    if not settings:
        settings = entities.Settings(user_id=current_user.id)
        session.add(settings)
        session.commit()
        session.refresh(settings)
    return settings


@router.put("", response_model=resources.Settings)
def update_settings(
    payload: resources.SettingsBase,
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    settings = (
        session.query(entities.Settings)
        .filter(entities.Settings.user_id == current_user.id)
        .first()
    )
    if not settings:
        settings = entities.Settings(user_id=current_user.id)
        session.add(settings)

    if payload.theme is not None:
        settings.theme = payload.theme
    if payload.notifications_enabled is not None:
        settings.notifications_enabled = payload.notifications_enabled
    if payload.language is not None:
        settings.language = payload.language

    session.commit()
    session.refresh(settings)
    return settings
