from typing import List

from app.core.config import get_settings
from app.models import entities
from app.services import openrouter
from app import db

settings = get_settings()


def _fetch_recent_messages(session, user_id: int, limit: int) -> List[entities.ChatHistory]:
    return (
        session.query(entities.ChatHistory)
        .filter(entities.ChatHistory.user_id == user_id)
        .order_by(entities.ChatHistory.created_at.desc())
        .limit(limit)
        .all()
    )


def generate_summary(session, user_id: int) -> str | None:
    messages = _fetch_recent_messages(session, user_id, settings.chat_summary_message_limit)
    if not messages:
        return None

    formatted = [
        {"role": m.role, "content": m.content}
        for m in reversed(messages)  # oldest first
    ]

    system_prompt = (
        "You are an assistant that creates concise summaries of a user's recent sobriety support chat. "
        "Highlight: mood trends, cravings, triggers, coping techniques, and any slips. "
        "Keep it under 120 words and actionable."
    )

    payload_messages = [{"role": "system", "content": system_prompt}] + formatted
    response = openrouter.chat_completion(payload_messages)

    content = (
        response.get("choices", [{}])[0]
        .get("message", {})
        .get("content")
    )
    return content or None


def update_summary_for_user(user_id: int) -> None:
    """
    Background-friendly wrapper: opens its own DB session, generates summary, saves it.
    """
    with db.SessionLocal() as session:
        summary_text = generate_summary(session, user_id)
        if summary_text is None:
            return

        summary = (
            session.query(entities.ChatSummary)
            .filter(entities.ChatSummary.user_id == user_id)
            .first()
        )
        if not summary:
            summary = entities.ChatSummary(user_id=user_id)
            session.add(summary)

        summary.summary = summary_text
        session.commit()
