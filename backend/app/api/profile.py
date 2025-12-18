from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import db
from app.dependencies.auth import get_current_user
from app.models import entities
from app.schemas.common import User, UserUpdate

router = APIRouter(prefix="/users/me", tags=["profile"])


@router.get("", response_model=User)
def get_me(current_user: entities.User = Depends(get_current_user)) -> entities.User:
    return current_user


@router.put("", response_model=User)
def update_me(
    payload: UserUpdate,
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
) -> entities.User:
    for field in [
        "language",
        "dependency_type",
        "quit_date",
        "motivation",
        "goal",
        "assistant_persona",
    ]:
        value = getattr(payload, field, None)
        if value is not None:
            setattr(current_user, field, value)

    session.commit()
    session.refresh(current_user)
    return current_user
