FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY alembic.ini .
COPY alembic ./alembic
COPY app ./app
COPY start.sh .
RUN chmod +x /app/start.sh
ENV CELERY_BROKER_URL=redis://redis:6379/0 CELERY_RESULT_BACKEND=redis://redis:6379/0

EXPOSE 8000

CMD ["./start.sh"]
