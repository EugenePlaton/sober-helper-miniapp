from fastapi import APIRouter

from app.schemas.common import Health

router = APIRouter(prefix="/health", tags=["health"])


@router.get("", response_model=Health)
def get_health() -> Health:
    return Health(status="ok")
