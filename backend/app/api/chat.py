from fastapi import APIRouter, Depends, Query, status, HTTPException
from sqlalchemy.orm import Session

from app import db
from app.dependencies.auth import get_current_user
from app.models import entities
from app.schemas import resources

router = APIRouter(prefix="/chat", tags=["chat"])


@router.get("/history", response_model=list[resources.ChatMessage])
def list_history(
    limit: int = Query(20, ge=1, le=200),
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    return (
        session.query(entities.ChatHistory)
        .filter(entities.ChatHistory.user_id == current_user.id)
        .order_by(entities.ChatHistory.created_at.desc())
        .limit(limit)
        .all()
    )


@router.post("/history", response_model=resources.ChatMessage, status_code=status.HTTP_201_CREATED)
def add_history(
    payload: resources.ChatMessageCreate,
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    message = entities.ChatHistory(
        user_id=current_user.id,
        role=payload.role,
        content=payload.content,
        assistant_type=payload.assistant_type or current_user.assistant_persona,
    )
    session.add(message)
    session.commit()
    session.refresh(message)
    return message


@router.get("/summary", response_model=resources.ChatSummary)
def get_summary(
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    summary = (
        session.query(entities.ChatSummary)
        .filter(entities.ChatSummary.user_id == current_user.id)
        .first()
    )
    if not summary:
        summary = entities.ChatSummary(user_id=current_user.id, summary=None)
        session.add(summary)
        session.commit()
        session.refresh(summary)
    return summary


@router.put("/summary", response_model=resources.ChatSummary)
def update_summary(
    payload: resources.ChatSummaryBase,
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    summary = (
        session.query(entities.ChatSummary)
        .filter(entities.ChatSummary.user_id == current_user.id)
        .first()
    )
    if not summary:
        summary = entities.ChatSummary(user_id=current_user.id)
        session.add(summary)

    summary.summary = payload.summary
    session.commit()
    session.refresh(summary)
    return summary
