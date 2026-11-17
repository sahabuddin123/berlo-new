# Berlo Communications Ltd. — Live Server Deployment Guide (aaPanel & Nginx)

Official production deployment documentation for **Berlo Communications Ltd.** (`berlocommunications.com`).  
Configured specifically for **Ubuntu 24.04 LTS**, **aaPanel Web Console**, **Nginx**, **PHP 8.3/8.4**, **PostgreSQL**, and **React 19 (Vite)**.

---

## Server Environment Details
- **Server OS:** Ubuntu 24.04.3 LTS
- **Panel:** aaPanel (Nginx)
- **Production Domain:** `berlocommunications.com` (and `www.berlocommunications.com`)
- **Project Root Directory:** `/www/wwwroot/berlocommunications.com`
- **Database Name:** `berlo_innova_db`
- **Database User:** `berlo_user`
- **Database Password:** `BerINN#3813@%Qa&`
- **Backend Directory:** `/www/wwwroot/berlocommunications.com/backend`
- **Frontend Build Directory:** `/www/wwwroot/berlocommunications.com/frontend/dist`

---

## Quick Navigation
1. [Prerequisites in aaPanel Dashboard](#1-prerequisites-in-aapanel-dashboard)
2. [Instant 1-Click Deployment (deploy.sh) — RECOMMENDED](#2-instant-1-click-deployment-deploysh--recommended)
3. [Manual Step-by-Step Live Server Setup](#3-manual-step-by-step-live-server-setup)
   - [Step 3.1: PostgreSQL Database & User Creation](#step-31-postgresql-database--user-creation)
   - [Step 3.2: Backend (Laravel) Setup & Seeding](#step-32-backend-laravel-setup--seeding)
   - [Step 3.3: Frontend (React) Production Build](#step-33-frontend-react-production-build)
   - [Step 3.4: Fix Ownership & Permissions](#step-34-fix-ownership--permissions)
4. [aaPanel Nginx Site Configuration for berlocommunications.com](#4-aapanel-nginx-site-configuration-for-berlocommunicationscom)
5. [SSL (Let's Encrypt) Setup](#5-ssl-lets-encrypt-setup)
6. [Default Superadmin Login Credentials](#6-default-superadmin-login-credentials)
7. [Future Updates / Git Pulls](#7-future-updates--git-pulls)

---

## 1. Prerequisites in aaPanel Dashboard

Before running commands, verify these software packages in your **aaPanel Web Dashboard** (`App Store → Installed`):

### A. Installed Software
- **Nginx** (1.24 or 1.26)
- **PHP** (PHP-8.3 or PHP-8.4 installed)
- **Node.js Version Manager** (Install **Node v20 LTS** or **v22 LTS** + `npm`)
- **PostgreSQL** (If not yet installed, `deploy.sh` installs it automatically, or run `sudo apt install -y postgresql postgresql-contrib`)

### B. Crucial PHP Settings (Inside aaPanel)
1. Go to **aaPanel → App Store → Installed → PHP (your version) → Settings**:
2. **Extensions tab**:
   - Install `pdo_pgsql`
   - Install `pgsql`
   - Install `fileinfo`
   - Install `redis` (optional)
   - Install `curl`, `zip`, `mbstring`, `openssl`, `intl`
3. **Disabled functions tab** *(VITAL: Composer and Laravel will fail if not removed)*:
   - Remove/Delete: `putenv`, `proc_open`, `symlink`, `pcntl_signal`, `pcntl_alarm`
4. Click **Restart PHP**.

---

## 2. Instant 1-Click Deployment (`deploy.sh`) — RECOMMENDED

Since you are already in your terminal at:
```bash
root@mail:/www/wwwroot/berlocommunications.com#
```

Just pull the latest script and execute `deploy.sh`:

```bash
git pull origin main && bash deploy.sh
```

### What `deploy.sh` automatically does for you:
1. Installs and starts PostgreSQL on Ubuntu (if not already running).
2. Creates the PostgreSQL database **`berlo_innova_db`** and user **`berlo_user`** with password **`BerINN#3813@%Qa&`**.
3. Installs backend dependencies via Composer.
4. Generates `.env` and `APP_KEY`.
5. Runs all database migrations & seeds all 14 dynamic sections, 9 services, projects, team, settings, and the default Superadmin.
6. Installs frontend NPM packages and compiles the production Vite React bundle.
7. Sets aaPanel `www:www` file ownership and Laravel storage permissions.
8. Clears and optimizes all production caches.

---

## 3. Manual Step-by-Step Live Server Setup

If you prefer running commands manually instead of `deploy.sh`:

### Step 3.1: PostgreSQL Database & User Creation

If PostgreSQL is not yet installed on your Ubuntu server, install it first:
```bash
sudo apt update && sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql && sudo systemctl start postgresql
```

Now open PostgreSQL shell:
```bash
sudo -u postgres psql
```

Inside the `psql` shell, paste these exact queries:
```sql
CREATE DATABASE berlo_innova_db;
CREATE USER berlo_user WITH ENCRYPTED PASSWORD 'BerINN#3813@%Qa&';
GRANT ALL PRIVILEGES ON DATABASE berlo_innova_db TO berlo_user;
ALTER DATABASE berlo_innova_db OWNER TO berlo_user;
\q
```

---

### Step 3.2: Backend (Laravel) Setup & Seeding

Navigate to the backend directory:
```bash
cd /www/wwwroot/berlocommunications.com/backend
```

#### 1. Install Composer dependencies:
```bash
composer install --no-dev --optimize-autoloader
```

#### 2. Create and configure `.env`:
```bash
cp .env.example .env
nano .env
```

Ensure the following exact configuration is set in `/www/wwwroot/berlocommunications.com/backend/.env`:
```ini
APP_NAME="Berlo Communications"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://berlocommunications.com

# PostgreSQL Database
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=berlo_innova_db
DB_USERNAME=berlo_user
DB_PASSWORD="BerINN#3813@%Qa&"

# Sessions & Cache (File driver works instantly without Redis setup)
SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_SECURE_COOKIE=true
CACHE_STORE=file
QUEUE_CONNECTION=sync

# CORS & Allowed Domains
FRONTEND_URL=https://berlocommunications.com,https://www.berlocommunications.com
SANCTUM_STATEFUL_DOMAINS=berlocommunications.com,www.berlocommunications.com
SANCTUM_TOKEN_EXPIRATION=1440
```
Save and exit `nano` (`CTRL + O` → `Enter` → `CTRL + X`).

#### 3. Run migrations, seeders, and optimization:
```bash
# Generate APP_KEY
php artisan key:generate --force

# Storage symlink for media files
php artisan storage:link

# Run migrations & seed ALL 14 dynamic sections, 9 services, projects, team, superadmin:
php artisan migrate --force
php artisan db:seed --force

# Cache routes, config, and views for maximum performance
php artisan optimize
```

---

### Step 3.3: Frontend (React) Production Build

Navigate to the frontend directory:
```bash
cd /www/wwwroot/berlocommunications.com/frontend
```

#### 1. Install NPM dependencies:
```bash
npm install
```

#### 2. Set production API base URL:
```bash
echo "VITE_API_URL=/api/v1" > .env.production
```

#### 3. Compile optimized production build:
```bash
npm run build
```
*(This outputs the production files into `/www/wwwroot/berlocommunications.com/frontend/dist`)*.

---

### Step 3.4: Fix Ownership & Permissions

In aaPanel, Nginx and PHP run under the user `www`. Since files were cloned as `root`, update ownership:

```bash
# Set ownership of all files to aaPanel user 'www'
chown -R www:www /www/wwwroot/berlocommunications.com

# Standard directory and file permissions
find /www/wwwroot/berlocommunications.com -type d -exec chmod 755 {} \;
find /www/wwwroot/berlocommunications.com -type f -exec chmod 644 {} \;

# Grant writable permissions to Laravel storage & bootstrap cache
chmod -R 775 /www/wwwroot/berlocommunications.com/backend/storage
chmod -R 775 /www/wwwroot/berlocommunications.com/backend/bootstrap/cache
chmod +x /www/wwwroot/berlocommunications.com/deploy.sh
```

---

## 4. aaPanel Nginx Site Configuration for berlocommunications.com

1. In aaPanel, go to **Website → Add Site** (or click your existing `berlocommunications.com` site):
   - **Domain:** `berlocommunications.com` and `www.berlocommunications.com`
   - **Root Directory:** `/www/wwwroot/berlocommunications.com/frontend/dist`
   - **PHP Version:** Select your installed version (e.g. `PHP-8.3` or `PHP-8.4`)
   - Click **Submit**.

2. Click on the site name `berlocommunications.com` in aaPanel, then go to the **Configuration file** tab.
3. Replace the configuration block with the following production Nginx config:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name berlocommunications.com www.berlocommunications.com;

    # Point root directly to the compiled React SPA
    root /www/wwwroot/berlocommunications.com/frontend/dist;
    index index.html;

    # Enterprise Security Headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # Gzip Compression for high-speed page loading
    gzip on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/javascript application/javascript application/json image/svg+xml;

    # 1. Frontend React Router (SPA History Mode)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 2. Static Assets Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
        access_log off;
        try_files $uri =404;
    }

    # 3. Media Uploads & Storage Symlink
    location ^~ /storage/ {
        alias /www/wwwroot/berlocommunications.com/backend/storage/app/public/;
        try_files $uri =404;
        access_log off;
    }

    # 4. Route /api and /sanctum requests to Laravel PHP-FPM
    location ^~ /api/ {
        alias /www/wwwroot/berlocommunications.com/backend/public/;
        try_files $uri $uri/ @backend;

        location ~ \.php$ {
            # Note: Update php-cgi-83.sock to match your PHP version (e.g., 82, 83, or 84)
            fastcgi_pass unix:/tmp/php-cgi-83.sock;
            fastcgi_index index.php;
            include fastcgi.conf;
            fastcgi_param SCRIPT_FILENAME /www/wwwroot/berlocommunications.com/backend/public/index.php;
        }
    }

    location @backend {
        rewrite ^/api/(.*)$ /index.php?$query_string last;
    }

    # Deny access to sensitive files
    location ~ /\.(env|git|htaccess|user\.ini) {
        deny all;
        return 404;
    }
}
```
4. Click **Save**.

---

## 5. SSL (Let's Encrypt) Setup

1. In aaPanel, go to **Website → click `berlocommunications.com` → SSL**.
2. Select **Let's Encrypt** tab.
3. Check both `berlocommunications.com` and `www.berlocommunications.com`.
4. Click **Apply**.
5. Once the certificate is issued, turn the **Force HTTPS** toggle **ON**.

---

## 6. Default Superadmin Login Credentials

Once deployment is complete, access your admin console:

- **Admin Login URL:** `https://berlocommunications.com/admin/login`
- **Email:** `superadmin@berlocommunications.com`
- **Password:** `Berlo@Admin2026!`

> **Security Note:** Upon logging in, go to **Management → Users & Roles**, edit the Superadmin user, and change your password and email.

---

## 7. Future Updates / Git Pulls

Whenever you push new code to GitHub, update your live server by running this one command in your terminal:

```bash
cd /www/wwwroot/berlocommunications.com && \
git pull origin main && \
cd backend && \
composer install --no-dev --optimize-autoloader && \
php artisan migrate --force && \
php artisan optimize && \
cd ../frontend && \
npm install && \
npm run build && \
chown -R www:www /www/wwwroot/berlocommunications.com && \
chmod -R 775 /www/wwwroot/berlocommunications.com/backend/storage /www/wwwroot/berlocommunications.com/backend/bootstrap/cache && \
echo "=== Update Deployed Successfully! ==="
```

---

© 2026 Berlo Communications Ltd. All rights reserved.
