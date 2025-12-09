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
cp .env.example .env  # обновите DATABASE_URL/SECRET_KEY/TELEGRAM_BOT_TOKEN/OPENROUTER_API_KEY/OPENROUTER_MODEL
alembic upgrade head  # применить миграции
./start.sh            # прогонит миграции и запустит FastAPI с --reload
# либо uvicorn app.main:app --reload если БД уже прогнана
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Docker Compose (Backend + Frontend + Postgres)
- При желании скопируйте пример переменных: `cp backend/.env.example backend/.env` и обновите значения.
- Запустите всё разом из корня: `docker compose up --build`.
- Доступы по умолчанию: API `http://localhost:8000` (Swagger на `/docs`), фронт `http://localhost:5173`, Postgres `localhost:5432` с `sober_helper/sober_helper` и БД `sober_helper`.
- Код монтируется в контейнеры, бекенд стартует с `--reload`, фронт — с Vite dev server и HMR.
- Backend контейнер прогоняет `alembic upgrade head` перед запуском, поэтому схема БД будет актуальной.

## Makefile команды (из корня)
- `make up` — поднять весь стек (db+backend+frontend).
- `make upb` — поднять db+backend.
- `make down` — остановить контейнеры.
- `make logs` — tail логов всех сервисов.
- `make migrate` — применить миграции (`alembic upgrade head`).
- `make makemigrations MIGRATION_NAME="add_table"` — сгенерировать миграцию.
- `make admin` — зайти в shell контейнера backend.
- `make psql` — открыть psql в контейнере db.

## Что реализовано в каркасе
- FastAPI приложение с CORS, health-check `/health`, и минимальным CRUD для пользователей (SQLAlchemy модели включают User/Habit/CheckIn/Journal/ChatHistory/ChatSummary/Settings/Subscription/ReferralCode/ReferralEvent).
- Базовые React-страницы: Login, Onboarding, Home, Chat, Check-in, Journal, Progress, Settings, Billing, Referrals.
- Общие UI-компоненты в стиле Telegram (TopBar, нижняя навигация, карточки), мобильный первый подход.
- Двуязычность через i18next (RU/EN), быстрый переключатель языка в шапке.
- Zustand стор для выбора персоны ассистента; статы и тексты заглушки для быстрой демонстрации.
- PWA манифест и заготовка сервис-воркера (доработайте регистрацию и кеширование при необходимости).
- Базовая аутентификация: `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/telegram` (JWT access/refresh, bcrypt), проверка Telegram login по `TELEGRAM_BOT_TOKEN`.
- Защищённые CRUD эндпоинты: `/habits`, `/check-ins`, `/journals`, `/chat/history`, `/chat/summary` (+ `/chat/summary/refresh`), `/settings`, `/subscriptions` (нужен `Authorization: Bearer <access_token>`). Добавление сообщения в чат триггерит пересчёт summary в фоне (OpenRouter).
- Обновлён UI: единые дизайн-токены (цвета/тени/радиусы), компактная навигация, быстрые действия на главной, выровненные формы и кнопки.
- Frontend API слой: fetch-клиент с рефрешем токена, Zustand auth store, React Query мутации для login/register и чек-инов (нужен `VITE_API_URL` на фронте).

## Чекпоинты
- Backend: Alembic + JWT аутентификация (email/password + Telegram), refresh-токены, bcrypt; CRUD по ключевым моделям (привычки, чек-ины, журнал, чат, настройки, подписки); OpenRouter summary автообновление.
- Frontend: обновлён базовый UI/UX (темизация, bottom-nav, быстрые действия), единые стили форм и кнопок; добавлен API клиент + auth store + базовые мутации (login/register/check-in).

## TODO (из промпта)
### Backend
- [x] Подключить реальную базу Postgres и миграции (Alembic), вынести секреты в .env.
- [x] Добавить аутентификацию: Telegram MiniApp login + email/password (JWT, refresh, хэш паролей).
- [x] CRUD + фильтры/пагинация для ключевых моделей; эндпоинты чата, summary, чек-инов, прогресса, журнала, настроек.
- [x] Интеграция OpenRouter + summary engine; хранение последних сообщений и авто-обновление summary.
- [ ] Лимиты фримиум/подписка, биллинг (Stripe/CryptoCloud/YooKassa) и проверки оплат.
- [ ] Планировщик уведомлений (ежедневные чек-ины, мотивация), логирование, rate limiting, базовые тесты/CI, Docker.
- [ ] Реферальная система: генерация кода, события приглашений, бонусы, отчёты в админке.

### Frontend (MiniApp + Web/PWA)
- [ ] Настроить полноценный UI: Tailwind дизайн, адаптивные сетки, светлая/тёмная тема (v1 обновление готово, тёмная тема позже).
- [x] Подключить API-клиент + React Query: авторизация, чат, чек-ины, журнал, прогресс, биллинг, рефералы (базовые login/register/check-in, остальные подключать по мере готовности API).
- [ ] Завершить экраны и состояния (онбординг, SOS-панель, графики прогресса, админка на отдельных роутерах).
- [ ] Регистрация/логин (Telegram + email), хранение токена в Zustand/secure storage.
- [ ] Добавить PWA-сервис-воркер с офлайн-кешем и иконками, интеграцию Telegram MiniApp API (theme params, haptics).
- [ ] Покрыть тестами (компонентные + e2e), настроить линтер/форматер.

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
