from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import db
from app.models import entities
from app.schemas.common import User, UserCreate

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[User])
def list_users(session: Session = Depends(db.get_db)):
    users = session.query(entities.User).limit(50).all()
    return users


@router.post("", response_model=User)
def create_user(payload: UserCreate, session: Session = Depends(db.get_db)):
    new_user = entities.User(
        email=payload.email,
        telegram_id=payload.telegram_id,
        language=payload.language or "en",
        dependency_type=payload.dependency_type,
        quit_date=payload.quit_date,
        motivation=payload.motivation,
        goal=payload.goal,
        assistant_persona=payload.assistant_persona or "calm",
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user
