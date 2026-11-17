# Berlo Communications Ltd. — Official Repository

Enterprise Public Relations & Strategic Corporate Communications Platform.  
Built with **Laravel 12 / 13 (PHP 8.2+)**, **PostgreSQL**, **Redis**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**.

---

## Table of Contents
1. [aaPanel & Nginx Live Server Deployment Guide (Step-by-Step)](#aapanel--nginx-live-server-deployment-guide)
   - [Pre-requisites in aaPanel](#1-pre-requisites-in-aapanel)
   - [Step 1: Clone Repository](#step-1-clone-repository)
   - [Step 2: Setup PostgreSQL Database](#step-2-setup-postgresql-database)
   - [Step 3: Setup Backend (Laravel)](#step-3-setup-backend-laravel)
   - [Step 4: Build Frontend (React + Vite)](#step-4-build-frontend-react--vite)
   - [Step 5: Set Permissions (Crucial for aaPanel)](#step-5-set-permissions-crucial-for-aapanel)
   - [Step 6: Nginx Site Configuration in aaPanel](#step-6-nginx-site-configuration-in-aapanel)
     - [Option A: Single Domain Setup (Recommended)](#option-a-single-domain-setup-yourdomaincom)
     - [Option B: Subdomain Setup (api.yourdomain.com + yourdomain.com)](#option-b-subdomain-setup-frontend--api-subdomain)
   - [Step 7: Install SSL (Let's Encrypt)](#step-7-install-ssl-lets-encrypt)
   - [Step 8: Default Superadmin Login](#step-8-default-superadmin-login)
2. [Updating Live Server After Future Git Pushes](#updating-live-server-after-future-git-pushes)
3. [Local Development Setup](#local-development-setup)
4. [Environment Variables Reference](#environment-variables-reference)

---

# aaPanel & Nginx Live Server Deployment Guide

Follow these exact step-by-step instructions to host Berlo Communications on your aaPanel VPS / Dedicated Server.

---

### 1. Pre-requisites in aaPanel

Before running any commands in your terminal, configure these components inside the **aaPanel Web Dashboard**:

#### A. Install Required Software (via aaPanel App Store)
- **Nginx** (v1.24 or v1.26 recommended)
- **PHP** (v8.2, v8.3, or v8.4)
- **Redis** (optional, recommended for cache/sessions)
- **Node.js Version Manager** (Install **Node.js v20 LTS** or **v22 LTS** and `npm`)
- **PostgreSQL** (Install via Linux terminal: `sudo apt install postgresql postgresql-contrib` or via aaPanel PostgreSQL Manager)

#### B. Crucial PHP Configuration (Inside aaPanel)
1. Go to **aaPanel Dashboard → App Store → Installed → PHP (your version) → Settings**:
2. **Install Extensions**:
   - Install `fileinfo`
   - Install `pdo_pgsql` & `pgsql`
   - Install `redis` (if using Redis)
   - Install `intl`, `curl`, `zip`, `mbstring`, `openssl`
3. **Remove Disabled Functions** *(Vital! Laravel & Composer will fail otherwise)*:
   - Click **Disabled functions** tab
   - Find and delete (remove):
     - `putenv`
     - `proc_open`
     - `symlink`
     - `pcntl_signal`
     - `pcntl_alarm`
4. Click **Restart** to apply PHP changes.

---

### Step 1: Clone Repository

Open your server's SSH terminal (as `root` or `sudo` user):

```bash
# 1. Navigate to aaPanel webroot directory
cd /www/wwwroot

# 2. Clone the repository
git clone https://github.com/sahabuddin123/berlo-new.git berlo-new

# 3. Enter the project directory
cd berlo-new
```

---

### Step 2: Setup PostgreSQL Database

Access the PostgreSQL CLI to create the production database and user:

```bash
# Switch to the postgres system user and open psql
sudo -u postgres psql
```

Execute the following SQL queries (replace `YourSecurePassword2026!` with your desired strong password):

```sql
-- 1. Create the database
CREATE DATABASE berlo_communications;

-- 2. Create the database user
CREATE USER berlo_user WITH ENCRYPTED PASSWORD 'YourSecurePassword2026!';

-- 3. Grant privileges
GRANT ALL PRIVILEGES ON DATABASE berlo_communications TO berlo_user;
ALTER DATABASE berlo_communications OWNER TO berlo_user;

-- 4. Exit PostgreSQL
\q
```

---

### Step 3: Setup Backend (Laravel)

```bash
# 1. Navigate to the backend directory
cd /www/wwwroot/berlo-new/backend

# 2. Install PHP Composer dependencies (production optimized)
composer install --no-dev --optimize-autoloader

# 3. Create .env file from example
cp .env.example .env

# 4. Open and edit .env
nano .env
```

#### Update the following lines in `/www/wwwroot/berlo-new/backend/.env`:

```ini
APP_NAME="Berlo Communications"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Database (PostgreSQL)
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=berlo_communications
DB_USERNAME=berlo_user
DB_PASSWORD=YourSecurePassword2026!

# Session & Cache (Use 'redis' if installed, or 'file' if redis is not running)
SESSION_DRIVER=redis
CACHE_STORE=redis
QUEUE_CONNECTION=redis

# CORS & Frontend Origins
FRONTEND_URL=https://yourdomain.com
SANCTUM_STATEFUL_DOMAINS=yourdomain.com
```

Save and exit `nano` (`CTRL + O`, `Enter`, `CTRL + X`).

#### Run Laravel Database Migrations, Seeding & Optimization:

```bash
# 1. Generate unique APP_KEY
php artisan key:generate

# 2. Create storage symlink for uploaded images/media
php artisan storage:link

# 3. Run database migrations & seed ALL initial production data
# (Seeds Superadmin user, 9 Core Services, Projects, Team, Home Page dynamic sections, etc.)
php artisan migrate --force
php artisan db:seed --force

# 4. Cache configuration, routes, and views for blazing-fast speed
php artisan optimize
```

---

### Step 4: Build Frontend (React + Vite)

```bash
# 1. Navigate to the frontend directory
cd /www/wwwroot/berlo-new/frontend

# 2. Install Node dependencies
npm install

# 3. (Optional) Create production environment file if needed:
# For Single Domain Setup (Option A below), leave it empty or relative (defaults to /api/v1):
echo "VITE_API_URL=/api/v1" > .env.production

# (Or for Subdomain Setup Option B, e.g. api.yourdomain.com):
# echo "VITE_API_URL=https://api.yourdomain.com/api/v1" > .env.production

# 4. Build production static bundle
npm run build
```

This compiles your React application into the directory:
`/www/wwwroot/berlo-new/frontend/dist`

---

### Step 5: Set Permissions (Crucial for aaPanel)

aaPanel runs Nginx and PHP-FPM under the user and group `www`. Give `www` ownership of the application:

```bash
# 1. Set ownership to aaPanel user 'www'
chown -R www:www /www/wwwroot/berlo-new

# 2. Set directory permissions
find /www/wwwroot/berlo-new -type d -exec chmod 755 {} \;
find /www/wwwroot/berlo-new -type f -exec chmod 644 {} \;

# 3. Give write permissions to Laravel storage and cache directories
chmod -R 775 /www/wwwroot/berlo-new/backend/storage
chmod -R 775 /www/wwwroot/berlo-new/backend/bootstrap/cache
```

---

### Step 6: Nginx Site Configuration in aaPanel

Choose either **Option A** (Single Domain - Easiest) or **Option B** (Separate Subdomain):

---

#### Option A: Single Domain Setup (`yourdomain.com`) — Recommended

This serves both the React Frontend and the Laravel Backend API on the same domain (e.g. `yourdomain.com`). This avoids all cross-domain CORS and cookie issues.

1. In aaPanel, go to **Website → Add Site**:
   - **Domain**: `yourdomain.com` (and `www.yourdomain.com`)
   - **Root Directory**: Select `/www/wwwroot/berlo-new/frontend/dist`
   - **FTP / Database**: Do not create
   - **PHP Version**: Select your installed PHP version (e.g. `PHP-8.3` or `PHP-8.4`)
   - Click **Submit**.

2. Click on the site name in aaPanel, then go to **Configuration file** tab.
3. Replace the configuration inside the `server { ... }` block with the following full block:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Root points to compiled React Vite SPA
    root /www/wwwroot/berlo-new/frontend/dist;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";

    # Gzip Compression
    gzip on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/javascript application/javascript application/json image/svg+xml;

    # 1. Route React SPA pages (History Mode)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 2. Static Asset Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
        access_log off;
        try_files $uri =404;
    }

    # 3. Laravel Storage (for uploaded media files)
    location ^~ /storage/ {
        alias /www/wwwroot/berlo-new/backend/storage/app/public/;
        try_files $uri =404;
        access_log off;
    }

    # 4. Route API requests directly to Laravel Backend PHP-FPM
    location ^~ /api/ {
        alias /www/wwwroot/berlo-new/backend/public/;
        try_files $uri $uri/ @backend;

        location ~ \.php$ {
            # Note: Update php-cgi-83.sock to your aaPanel PHP version (e.g., 82, 83, or 84)
            fastcgi_pass unix:/tmp/php-cgi-83.sock;
            fastcgi_index index.php;
            include fastcgi.conf;
            fastcgi_param SCRIPT_FILENAME /www/wwwroot/berlo-new/backend/public/index.php;
        }
    }

    location @backend {
        rewrite ^/api/(.*)$ /index.php?$query_string last;
    }

    # Deny access to sensitive files
    location ~ /\.(env|git|htaccess) {
        deny all;
        return 404;
    }
}
```

4. Click **Save**.

---

#### Option B: Subdomain Setup (Frontend + API Subdomain)

If you prefer having `yourdomain.com` for the Frontend and `api.yourdomain.com` for the Backend API:

1. **Create Backend Site in aaPanel:**
   - Domain: `api.yourdomain.com`
   - Root Directory: `/www/wwwroot/berlo-new/backend/public`
   - PHP Version: `PHP-8.3` (or `PHP-8.4`)
   - In Site Settings → **URL Rewrite**, choose the preset **`laravel5`** and click Save.

2. **Create Frontend Site in aaPanel:**
   - Domain: `yourdomain.com`
   - Root Directory: `/www/wwwroot/berlo-new/frontend/dist`
   - PHP Version: `Pure static`
   - In Site Settings → **URL Rewrite**, add:
     ```nginx
     location / {
         try_files $uri $uri/ /index.html;
     }
     ```
   - Make sure `frontend/.env.production` has `VITE_API_URL=https://api.yourdomain.com/api/v1` and rebuild via `npm run build`.

---

### Step 7: Install SSL (Let's Encrypt)

1. In aaPanel, go to **Website → click your site → SSL**.
2. Select **Let's Encrypt** tab.
3. Check your domain name(s) and click **Apply**.
4. Once issued, toggle **Force HTTPS** ON.

---

### Step 8: Default Superadmin Login

Your database is seeded with a default Superadmin account ready to manage the entire site:

- **Admin Login URL:** `https://yourdomain.com/admin/login`
- **Email:** `superadmin@berlocommunications.com`
- **Password:** `Berlo@Admin2026!`

> **Security Tip:** Immediately after logging into the admin panel for the first time, navigate to **Management → Users & Roles**, edit the Superadmin user, and update your email and password.

---

## Updating Live Server After Future Git Pushes

Whenever you push new updates to GitHub and want to deploy them on your live server, simply run this one-line update command (or execute step-by-step):

```bash
cd /www/wwwroot/berlo-new && \
git pull origin main && \
cd backend && \
composer install --no-dev --optimize-autoloader && \
php artisan migrate --force && \
php artisan optimize && \
cd ../frontend && \
npm install && \
npm run build && \
chown -R www:www /www/wwwroot/berlo-new && \
chmod -R 775 /www/wwwroot/berlo-new/backend/storage /www/wwwroot/berlo-new/backend/bootstrap/cache && \
echo "Deployment Complete!"
```

---

## Local Development Setup

For local development on WampServer or local machine:

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
# Running at http://127.0.0.1:8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Running at http://localhost:5173
```

---

## Environment Variables Reference

### Backend (`backend/.env`)

| Variable | Description | Production Example |
|---|---|---|
| `APP_NAME` | Application Name | `Berlo Communications` |
| `APP_ENV` | Environment | `production` |
| `APP_DEBUG` | Debug Mode (must be false in production) | `false` |
| `APP_URL` | Base Website / API URL | `https://yourdomain.com` |
| `DB_CONNECTION` | Database Driver | `pgsql` |
| `DB_HOST` | Database Host | `127.0.0.1` |
| `DB_PORT` | Database Port | `5432` |
| `DB_DATABASE` | PostgreSQL Database Name | `berlo_communications` |
| `DB_USERNAME` | Database User | `berlo_user` |
| `DB_PASSWORD` | Database User Password | `YourSecurePassword2026!` |
| `SESSION_DRIVER` | Session Driver | `redis` (or `file`) |
| `CACHE_STORE` | Cache Driver | `redis` (or `file`) |
| `QUEUE_CONNECTION` | Queue Driver | `redis` (or `sync`) |
| `FRONTEND_URL` | Frontend Origin (for CORS) | `https://yourdomain.com` |
| `SANCTUM_STATEFUL_DOMAINS` | Allowed SPA Domains | `yourdomain.com` |

### Frontend (`frontend/.env.production`)

| Variable | Description | Production Value |
|---|---|---|
| `VITE_API_URL` | Full API Base URL | `/api/v1` (Single Domain) or `https://api.yourdomain.com/api/v1` |

---

© 2026 Berlo Communications Ltd. All rights reserved.
