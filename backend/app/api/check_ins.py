from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app import db
from app.dependencies.auth import get_current_user
from app.dependencies import subscription as subscription_limits
from app.models import entities
from app.schemas import resources

router = APIRouter(prefix="/check-ins", tags=["check-ins"])


@router.get("", response_model=list[resources.CheckIn])
def list_check_ins(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    return (
        session.query(entities.CheckIn)
        .filter(entities.CheckIn.user_id == current_user.id)
        .order_by(entities.CheckIn.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


@router.post("", response_model=resources.CheckIn, status_code=status.HTTP_201_CREATED)
def create_check_in(
    payload: resources.CheckInCreate,
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    subscription_limits.enforce_checkin_limit(session, current_user)

    check_in = entities.CheckIn(
        user_id=current_user.id,
        mood=payload.mood,
        craving_level=payload.craving_level,
        triggers=payload.triggers,
        help_text=payload.help_text,
        notes=payload.notes,
        slipped=payload.slipped,
    )
    session.add(check_in)
    session.commit()
    session.refresh(check_in)
    return check_in


@router.delete("/{check_in_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_check_in(
    check_in_id: int,
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    check_in = session.get(entities.CheckIn, check_in_id)
    if not check_in or check_in.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Check-in not found")

    session.delete(check_in)
    session.commit()
    return None
