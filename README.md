# Berlo Communications — Development Environment

Monorepo for the Berlo Communications platform. Backend powered by Laravel 13, frontend by React + TypeScript + Vite.

---

## Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13, PHP 8.4 |
| Auth | Laravel Sanctum |
| Database | PostgreSQL |
| Cache / Queue / Session | Redis (via Predis) |
| Frontend | React 19, TypeScript, Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Package Managers | Composer, npm |

---

## Prerequisites

| Tool | Required Version |
|---|---|
| PHP | 8.4+ |
| Composer | 2.x |
| Node.js | LTS (22+) |
| npm | 10+ |
| PostgreSQL | 15+ |
| Redis | 7+ |

> **PHP extensions required:** `pdo_pgsql`, `pgsql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `fileinfo`, `bcmath`, `intl`, `curl`, `zip`

---

## Directory Structure

```
berlo-new/
├── backend/          # Laravel 13 API
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── public/
│   ├── resources/
│   ├── routes/
│   │   ├── api.php
│   │   └── web.php
│   ├── storage/
│   ├── tests/
│   ├── .env.example
│   └── composer.json
│
├── frontend/         # React + TypeScript SPA
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── utils/
│   │   └── styles/
│   ├── .env.example
│   └── package.json
│
├── docs/
├── .gitignore
└── README.md
```

---

## Installation

### 1. Clone & enter the project

```bash
git clone <repository-url> berlo-new
cd berlo-new
```

### 2. Backend Setup

```bash
cd backend

# Install PHP dependencies
composer install

# Copy environment file and configure it
cp .env.example .env

# Generate application key
php artisan key:generate

# Run database migrations (requires PostgreSQL to be running)
php artisan migrate
```

**Edit `.env` to set your PostgreSQL credentials:**

```dotenv
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=berlo_communications
DB_USERNAME=your_pg_user
DB_PASSWORD=your_pg_password
```

**Create the PostgreSQL database:**

```sql
CREATE DATABASE berlo_communications;
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install Node dependencies
npm install

# Copy environment file
cp .env.example .env.local
```

---

## Development Servers

### Backend (Laravel)

```bash
cd backend
php artisan serve
# → http://localhost:8000
```

### Frontend (Vite)

```bash
cd frontend
npm run dev
# → http://localhost:5173
```

---

## Useful Commands

### Backend

```bash
# Run all tests
php artisan test

# Check Laravel version
php artisan --version

# Clear all caches
php artisan optimize:clear

# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Generate application key
php artisan key:generate

# List all routes
php artisan route:list
```

### Frontend

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# TypeScript check
npx tsc --noEmit
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
|---|---|---|
| `APP_NAME` | Application name | Berlo Communications |
| `APP_ENV` | Environment | local |
| `APP_DEBUG` | Debug mode | true |
| `APP_URL` | Backend URL | http://localhost:8000 |
| `DB_CONNECTION` | Database driver | pgsql |
| `DB_HOST` | PostgreSQL host | 127.0.0.1 |
| `DB_PORT` | PostgreSQL port | 5432 |
| `DB_DATABASE` | Database name | berlo_communications |
| `DB_USERNAME` | Database user | postgres |
| `DB_PASSWORD` | Database password | _(empty)_ |
| `CACHE_STORE` | Cache driver | redis |
| `SESSION_DRIVER` | Session driver | redis |
| `QUEUE_CONNECTION` | Queue driver | redis |
| `REDIS_CLIENT` | Redis PHP client | predis |
| `REDIS_HOST` | Redis host | 127.0.0.1 |
| `REDIS_PORT` | Redis port | 6379 |
| `SANCTUM_STATEFUL_DOMAINS` | SPA domains | localhost:5173 |
| `FRONTEND_URL` | Frontend origin for CORS | http://localhost:5173 |

### Frontend (`frontend/.env.local`)

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API URL | http://localhost:8000 |

---

## Notes on Redis

Redis is configured as the driver for **cache**, **sessions**, and **queues**. The PHP client used is [`predis/predis`](https://github.com/predis/predis) (pure PHP — no native extension required).

If Redis is not available locally, you can temporarily switch the drivers in `.env`:

```dotenv
CACHE_STORE=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

---

## Notes on PostgreSQL

Ensure the `pdo_pgsql` and `pgsql` PHP extensions are enabled. On WampServer, uncomment in `php.ini`:

```ini
extension=pdo_pgsql
extension=pgsql
```

---

## Phase Roadmap

- [x] **Phase 01** — Project foundation, dependencies, environment configuration
- [ ] **Phase 02** — Authentication system (Sanctum, login, registration)
- [ ] **Phase 03** — Core data models & migrations
- [ ] **Phase 04** — API endpoints
- [ ] **Phase 05** — Frontend pages & UI

