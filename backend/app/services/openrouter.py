from typing import Any

import httpx

from app.core.config import get_settings

settings = get_settings()


def chat_completion(messages: list[dict[str, str]]) -> dict[str, Any]:
    """
    Thin synchronous wrapper around OpenRouter chat completions.
    """
    if not settings.openrouter_api_key:
        raise RuntimeError("OPENROUTER_API_KEY is not configured")

    headers = {
        "Authorization": f"Bearer {settings.openrouter_api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://sober-helper",
        "X-Title": settings.app_name,
    }
    payload = {
        "model": settings.openrouter_model,
        "messages": messages,
    }

    with httpx.Client(base_url=settings.openrouter_base_url, timeout=30) as client:
        resp = client.post("/chat/completions", json=payload, headers=headers)
        resp.raise_for_status()
        return resp.json()
