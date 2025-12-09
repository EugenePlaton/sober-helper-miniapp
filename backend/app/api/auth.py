from datetime import datetime, timezone, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from jose import JWTError
from sqlalchemy.orm import Session

from app import db
from app.core import security
from app.core.config import get_settings
from app.models import entities
from app.schemas.auth import (
    AuthResponse,
    LoginRequest,
    RefreshRequest,
    RegisterRequest,
    TelegramAuthRequest,
    Token,
)

router = APIRouter(prefix="/auth", tags=["auth"])
settings = get_settings()


def _issue_tokens(user_id: int) -> Token:
    return Token(
        access_token=security.create_access_token(user_id),
        refresh_token=security.create_refresh_token(user_id),
    )


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, session: Session = Depends(db.get_db)) -> AuthResponse:
    existing = session.query(entities.User).filter(entities.User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User with this email already exists")

    hashed_password = security.get_password_hash(payload.password)
    user = entities.User(
        email=payload.email,
        password_hash=hashed_password,
        language=payload.language or "en",
        is_active=True,
    )
    session.add(user)
    session.commit()
    session.refresh(user)

    return AuthResponse(user=user, tokens=_issue_tokens(user.id))


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, session: Session = Depends(db.get_db)) -> AuthResponse:
    user = session.query(entities.User).filter(entities.User.email == payload.email).first()
    if not user or not security.verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    return AuthResponse(user=user, tokens=_issue_tokens(user.id))


@router.post("/refresh", response_model=Token)
def refresh_token(payload: RefreshRequest, session: Session = Depends(db.get_db)) -> Token:
    try:
        data = security.decode_token(payload.refresh_token)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    if data.get("type") != "refresh":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type")

    user_id = data.get("sub")
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token subject")

    user = session.get(entities.User, int(user_id))
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    return _issue_tokens(user.id)


@router.post("/telegram", response_model=AuthResponse)
def telegram_login(payload: TelegramAuthRequest, session: Session = Depends(db.get_db)) -> AuthResponse:
    if not settings.telegram_bot_token:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="TELEGRAM_BOT_TOKEN is not configured")

    payload_dict = payload.model_dump()
    if not security.verify_telegram_auth(payload_dict, settings.telegram_bot_token):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Telegram auth data")

    # Reject stale auth attempts (older than 1 day)
    auth_date = datetime.fromtimestamp(payload.auth_date, tz=timezone.utc)
    if datetime.now(timezone.utc) - auth_date > timedelta(days=1):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Telegram auth data expired")

    user = session.query(entities.User).filter(entities.User.telegram_id == str(payload.id)).first()
    if not user:
        user = entities.User(
            telegram_id=str(payload.id),
            language="en",
            is_active=True,
        )
        session.add(user)
        session.commit()
        session.refresh(user)

    return AuthResponse(user=user, tokens=_issue_tokens(user.id))
