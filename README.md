# Sober Helper — MiniApp + Web/PWA (Starter)

Этот репозиторий содержит каркас для проекта Sober Helper: единая кодовая база для Telegram Mini App и полноценного Web/PWA с поддержкой RU/EN. Основа — минималистичный дизайн в стиле Telegram, mobile-first, с мягкими тенями и скруглёнными элементами.

## Структура репозитория
- `CODEX_PROMPT.md` — полный промпт (RU/EN) для генераторов кода с описанием продукта, UX и расширенного TODO.
- `backend/` — FastAPI + SQLAlchemy каркас, health-check, CRUD-заготовки пользователей.
- `frontend/` — Vite + React + Tailwind, Zustand, React Query, i18n (RU/EN), базовые экраны MiniApp/Web, PWA манифест.
- `public/manifest.webmanifest` — PWA-манифест (иконки добавьте позже).

## Быстрый старт
### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Что реализовано в каркасе
- FastAPI приложение с CORS, health-check `/health`, и минимальным CRUD для пользователей (SQLAlchemy модели включают User/Habit/CheckIn/Journal/ChatHistory/ChatSummary/Settings/Subscription/ReferralCode/ReferralEvent).
- Базовые React-страницы: Login, Onboarding, Home, Chat, Check-in, Journal, Progress, Settings, Billing, Referrals.
- Общие UI-компоненты в стиле Telegram (TopBar, нижняя навигация, карточки), мобильный первый подход.
- Двуязычность через i18next (RU/EN), быстрый переключатель языка в шапке.
- Zustand стор для выбора персоны ассистента; статы и тексты заглушки для быстрой демонстрации.
- PWA манифест и заготовка сервис-воркера (доработайте регистрацию и кеширование при необходимости).

## TODO (из промпта)
### Backend
1. Подключить реальную базу Postgres и миграции (Alembic), вынести секреты в .env.
2. Добавить аутентификацию: Telegram MiniApp login + email/password (JWT, refresh, хэш паролей).
3. CRUD + фильтры/пагинация для всех моделей; эндпоинты чата, summary, чек-инов, прогресса, журнала, настроек.
4. Интеграция OpenRouter + summary engine; хранение последних сообщений и авто-обновление summary.
5. Лимиты фримиум/подписка, биллинг (Stripe/CryptoCloud/YooKassa) и проверки оплат.
6. Планировщик уведомлений (ежедневные чек-ины, мотивация), логирование, rate limiting, базовые тесты/CI, Docker.
7. Реферальная система: генерация кода, события приглашений, бонусы, отчёты в админке.

### Frontend (MiniApp + Web/PWA)
1. Настроить полноценный UI: Tailwind дизайн, адаптивные сетки, светлая/тёмная тема.
2. Подключить API-клиент + React Query: авторизация, чат, чек-ины, журнал, прогресс, биллинг, рефералы.
3. Завершить экраны и состояния (онбординг, SOS-панель, графики прогресса, админка на отдельных роутерах).
4. Регистрация/логин (Telegram + email), хранение токена в Zustand/secure storage.
5. Добавить PWA-сервис-воркер с офлайн-кешем и иконками, интеграцию Telegram MiniApp API (theme params, haptics).
6. Покрыть тестами (компонентные + e2e), настроить линтер/форматер.

### Admin Panel
- Авторизация (email/pass), роли admin/operator.
- Таблицы: пользователи, чек-ины, summary, платежи, рефералы.
- Метрики: streaks, churn, триггеры, удержание; ручные уведомления, экспорт CSV.

### Deploy
- Docker/Compose, CI/CD, миграции, HTTPS и домены (Railway/Render/Fly.io/VPS).

## Стиль и UX
- Минимализм в стиле Telegram: много воздуха, мягкие тени (0–1), скругления ~12px, аккуратные голубые/нейтральные оттенки.
- Mobile-first, адаптив под десктоп, короткие копии и понятные CTA.
- Ассистент использует выбранный характер (calm/friendly/coach/toxic) во всех сообщениях и мотивациях.
