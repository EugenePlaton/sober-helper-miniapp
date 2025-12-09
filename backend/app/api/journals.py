from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app import db
from app.dependencies.auth import get_current_user
from app.models import entities
from app.schemas import resources

router = APIRouter(prefix="/journals", tags=["journals"])


@router.get("", response_model=list[resources.Journal])
def list_journals(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    return (
        session.query(entities.Journal)
        .filter(entities.Journal.user_id == current_user.id)
        .order_by(entities.Journal.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


@router.post("", response_model=resources.Journal, status_code=status.HTTP_201_CREATED)
def create_journal(
    payload: resources.JournalCreate,
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    journal = entities.Journal(user_id=current_user.id, content=payload.content)
    session.add(journal)
    session.commit()
    session.refresh(journal)
    return journal


@router.delete("/{journal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_journal(
    journal_id: int,
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    journal = session.get(entities.Journal, journal_id)
    if not journal or journal.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Journal not found")

    session.delete(journal)
    session.commit()
    return None
