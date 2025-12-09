from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app import db
from app.dependencies.auth import get_current_user
from app.models import entities
from app.schemas import resources

router = APIRouter(prefix="/habits", tags=["habits"])


@router.get("", response_model=list[resources.Habit])
def list_habits(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    return (
        session.query(entities.Habit)
        .filter(entities.Habit.user_id == current_user.id)
        .offset(skip)
        .limit(limit)
        .all()
    )


@router.post("", response_model=resources.Habit, status_code=status.HTTP_201_CREATED)
def create_habit(
    payload: resources.HabitCreate,
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    habit = entities.Habit(
        user_id=current_user.id,
        type=payload.type,
        description=payload.description,
    )
    session.add(habit)
    session.commit()
    session.refresh(habit)
    return habit


@router.put("/{habit_id}", response_model=resources.Habit)
def update_habit(
    habit_id: int,
    payload: resources.HabitUpdate,
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    habit = session.get(entities.Habit, habit_id)
    if not habit or habit.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Habit not found")

    if payload.type is not None:
        habit.type = payload.type
    if payload.description is not None:
        habit.description = payload.description

    session.commit()
    session.refresh(habit)
    return habit


@router.delete("/{habit_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_habit(
    habit_id: int,
    session: Session = Depends(db.get_db),
    current_user: entities.User = Depends(get_current_user),
):
    habit = session.get(entities.Habit, habit_id)
    if not habit or habit.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Habit not found")

    session.delete(habit)
    session.commit()
    return None
