#!/usr/bin/env bash

# ==============================================================================
# Berlo Communications Ltd. — Automated Production Deployment Script
# Target: Ubuntu 24.04 LTS / aaPanel / Nginx / PostgreSQL / React 19 / Laravel
# ==============================================================================

set -e

# Color codes for clean output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}===================================================================${NC}"
echo -e "${CYAN}    Berlo Communications Ltd. — Production Deployment (aaPanel)    ${NC}"
echo -e "${PURPLE}===================================================================${NC}"

# Detect Project Root Directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

PROJECT_ROOT="$SCRIPT_DIR"
echo -e "${BLUE}▶ Project Root Directory:${NC} $PROJECT_ROOT"

# Database Configuration
DB_NAME="berlo_innova_db"
DB_USER="berlo_user"
DB_PASS="BerINN#3813@%Qa&"
DOMAIN="berlocommunications.com"

# ------------------------------------------------------------------------------
# 1. PostgreSQL Check & Database Setup
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}▶ Step 1: Checking and setting up PostgreSQL...${NC}"

if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}PostgreSQL not found. Installing postgresql on Ubuntu...${NC}"
    apt-get update -y
    apt-get install -y postgresql postgresql-contrib
fi

# Ensure PostgreSQL service is active
systemctl enable postgresql || true
systemctl start postgresql || true

echo -e "${GREEN}Creating/Configuring PostgreSQL database '${DB_NAME}' and user '${DB_USER}'...${NC}"

# Create or update user password
sudo -u postgres psql -c "DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${DB_USER}') THEN
    CREATE USER ${DB_USER} WITH ENCRYPTED PASSWORD '${DB_PASS}';
  ELSE
    ALTER USER ${DB_USER} WITH ENCRYPTED PASSWORD '${DB_PASS}';
  END IF;
END
\$\$;"

# Create database if not exists
if ! sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw "${DB_NAME}"; then
    sudo -u postgres psql -c "CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};"
    echo -e "${GREEN}Database '${DB_NAME}' created successfully.${NC}"
else
    echo -e "${BLUE}Database '${DB_NAME}' already exists.${NC}"
fi

# Grant all privileges
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};"
sudo -u postgres psql -c "ALTER DATABASE ${DB_NAME} OWNER TO ${DB_USER};"

# ------------------------------------------------------------------------------
# 2. Setup Backend (Laravel)
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}▶ Step 2: Setting up Backend (Laravel)...${NC}"
cd "$PROJECT_ROOT/backend"

# Ensure composer is installed
if ! command -v composer &> /dev/null; then
    echo -e "${YELLOW}Composer not found. Installing composer...${NC}"
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
fi

echo -e "${CYAN}Installing backend PHP dependencies...${NC}"
composer install --no-dev --optimize-autoloader --no-interaction

# Create/Update .env file with exact live server parameters
echo -e "${CYAN}Configuring backend .env file...${NC}"
cat <<EOF > .env
APP_NAME="Berlo Communications"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://${DOMAIN}

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US
APP_MAINTENANCE_DRIVER=file
BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_LEVEL=error

# PostgreSQL Database (Configured Automatically)
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=${DB_NAME}
DB_USERNAME=${DB_USER}
DB_PASSWORD="${DB_PASS}"

# Session & Cache (File driver for zero-configuration instant reliability)
SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_SECURE_COOKIE=true
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local

QUEUE_CONNECTION=sync
CACHE_STORE=file

# Sanctum Token Lifetime (1440 minutes = 24 hours)
SANCTUM_TOKEN_EXPIRATION=1440
SANCTUM_STATEFUL_DOMAINS=${DOMAIN},www.${DOMAIN}

# Allowed Frontend Origins (CORS)
FRONTEND_URL=https://${DOMAIN},https://www.${DOMAIN}

MAIL_MAILER=log
MAIL_FROM_ADDRESS="hello@berlocommunications.com"
MAIL_FROM_NAME="\${APP_NAME}"
EOF

# Generate application key if not set
php artisan key:generate --force

# Create public storage symlink for uploaded media
php artisan storage:link || true

# Run database migrations and seed full initial content
echo -e "${CYAN}Running database migrations & seeders (Superadmin, 9 Services, Projects, Team, Home Page)...${NC}"
php artisan migrate --force
php artisan db:seed --force

# Clear and optimize Laravel caches
echo -e "${CYAN}Optimizing Laravel route, view, and config caches...${NC}"
php artisan optimize:clear
php artisan optimize

# ------------------------------------------------------------------------------
# 3. Setup Frontend (React + Vite)
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}▶ Step 3: Setting up Frontend (React + Vite)...${NC}"
cd "$PROJECT_ROOT/frontend"

# Ensure Node and npm are available
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: Node.js / npm is not installed!${NC}"
    echo -e "${YELLOW}Please install Node.js (v20 or v22 LTS) from aaPanel App Store -> 'Node.js Version Manager'${NC}"
    exit 1
fi

echo -e "${CYAN}Installing frontend NPM packages...${NC}"
npm install

echo -e "${CYAN}Setting production environment...${NC}"
echo "VITE_API_URL=/api/v1" > .env.production

echo -e "${CYAN}Building production bundle (Vite)...${NC}"
npm run build

# ------------------------------------------------------------------------------
# 4. aaPanel Permissions & Ownership
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}▶ Step 4: Setting permissions for aaPanel (user 'www')...${NC}"
cd "$PROJECT_ROOT"

# Check if 'www' user exists (standard in aaPanel)
if id "www" &>/dev/null; then
    chown -R www:www "$PROJECT_ROOT"
    echo -e "${GREEN}Ownership set to user 'www:www'${NC}"
else
    echo -e "${BLUE}User 'www' not found, keeping current user.${NC}"
fi

find "$PROJECT_ROOT" -type d -exec chmod 755 {} \;
find "$PROJECT_ROOT" -type f -exec chmod 644 {} \;

# Writable directories for Laravel
chmod -R 775 "$PROJECT_ROOT/backend/storage" "$PROJECT_ROOT/backend/bootstrap/cache"
chmod +x "$PROJECT_ROOT/deploy.sh"

# ------------------------------------------------------------------------------
# 5. Summary & Next Steps
# ------------------------------------------------------------------------------
echo -e "\n${GREEN}===================================================================${NC}"
echo -e "${GREEN}   ✔ ALL DEPLOYMENT TASKS COMPLETED SUCCESSFULLY!                ${NC}"
echo -e "${GREEN}===================================================================${NC}"
echo -e "${CYAN}Database Name:${NC}      ${DB_NAME}"
echo -e "${CYAN}Database User:${NC}      ${DB_USER}"
echo -e "${CYAN}Database Password:${NC}  ${DB_PASS}"
echo -e "${CYAN}Frontend Built At:${NC}  ${PROJECT_ROOT}/frontend/dist"
echo -e "${CYAN}Backend Public At:${NC}  ${PROJECT_ROOT}/backend/public"
echo -e "-------------------------------------------------------------------"
echo -e "${YELLOW}Default Superadmin Credentials:${NC}"
echo -e "  🌐 Login URL:  ${CYAN}https://${DOMAIN}/admin/login${NC}"
echo -e "  📧 Email:      ${CYAN}superadmin@berlocommunications.com${NC}"
echo -e "  🔑 Password:   ${CYAN}Berlo@Admin2026!${NC}"
echo -e "-------------------------------------------------------------------"
echo -e "${PURPLE}Important Next Steps in aaPanel:${NC}"
echo -e "1. In aaPanel Website -> Set Site Root to: ${GREEN}${PROJECT_ROOT}/frontend/dist${NC}"
echo -e "2. Copy the Nginx configuration from README.md into site's 'Configuration file' tab"
echo -e "3. Apply Let's Encrypt SSL in aaPanel and enable 'Force HTTPS'"
echo -e "${GREEN}===================================================================${NC}\n"
