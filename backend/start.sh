#!/usr/bin/env sh
set -e

echo "Waiting for DB..."
python - <<'PY'
import time
from sqlalchemy import create_engine, text
from app.core.config import get_settings

settings = get_settings()
engine = create_engine(settings.database_url)

for i in range(30):
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print("DB is ready")
        break
    except Exception as exc:
        print(f"DB not ready yet ({i+1}/30): {exc}")
        time.sleep(2)
else:
    raise SystemExit("Database is not ready")
PY

echo "Applying migrations..."
alembic upgrade head

echo "Starting API..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
