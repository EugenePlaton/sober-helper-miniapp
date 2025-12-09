from fastapi import APIRouter, Depends, Query, status, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session

from app import db
from app.dependencies.auth import get_current_user
from app.models import entities
from app.schemas import resources
from app.services import summary as summary_service

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
    background_tasks: BackgroundTasks = None,
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

    if background_tasks is not None:
        background_tasks.add_task(summary_service.update_summary_for_user, current_user.id)

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


@router.post("/summary/refresh", response_model=resources.ChatSummary)
def refresh_summary(
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    try:
        generated = summary_service.generate_summary(session, current_user.id)
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(exc))
    summary = (
        session.query(entities.ChatSummary)
        .filter(entities.ChatSummary.user_id == current_user.id)
        .first()
    )
    if not summary:
        summary = entities.ChatSummary(user_id=current_user.id)
        session.add(summary)

    summary.summary = generated
    session.commit()
    session.refresh(summary)
    return summary
