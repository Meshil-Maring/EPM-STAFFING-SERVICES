# PostgreSQL Setup Guide for EPM Staffing Services

## Overview

This guide will help you set up PostgreSQL database for your EPM Staffing Services application.

## Step 1: Install PostgreSQL

### Option A: Install PostgreSQL Locally (Recommended for Development)

1. **Download PostgreSQL**
   - Go to: https://www.postgresql.org/download/windows/
   - Download the PostgreSQL installer (version 14 or higher recommended)
   - Run the installer and follow these steps:
     - Installation directory: `C:\Program Files\PostgreSQL\15` (or similar)
     - Select components: PostgreSQL Server, pgAdmin 4, Command Line Tools
     - Set a password for the `postgres` superuser (remember this!)
     - Port: `5432` (default)
     - Locale: Default (English, United States)

2. **Verify Installation**
   Open a new terminal and run:
   ```bash
   psql --version
   ```
   You should see: `psql (PostgreSQL) 15.x.x`

### Option B: Use Docker (Alternative)

If you prefer Docker, you can run PostgreSQL in a container:

```bash
docker run --name epm-postgres -e POSTGRES_PASSWORD=your_password -p 5432:5432 -d postgres:15
```

## Step 2: Create Database and User

### Using pgAdmin (GUI)

1. Open pgAdmin 4 (installed with PostgreSQL)
2. Connect to PostgreSQL using the password you set
3. Right-click on "Databases" → "Create" → "Database"
   - Name: `epm_staffing`
   - Owner: `postgres` (or create a new user)
4. Click "Save"

### Using Command Line

1. Open Command Prompt as Administrator
2. Navigate to PostgreSQL bin directory:
   ```bash
   cd "C:\Program Files\PostgreSQL\15\bin"
   ```
3. Connect as postgres user:
   ```bash
   psql -U postgres
   ```
4. Create database:
   ```sql
   CREATE DATABASE epm_staffing;
   ```
5. Create a user (optional):
   ```sql
   CREATE USER epm_user WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE epm_staffing TO epm_user;
   ```
6. Exit:
   ```sql
   \q
   ```

## Step 3: Configure Environment Variables

1. Open `server/.env` file
2. Update the `DATABASE_URL` with your actual credentials:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/epm_staffing

# If you created a separate user:
# DATABASE_URL=postgresql://epm_user:your_secure_password@localhost:5432/epm_staffing

# Session Configuration
SESSION_SECRET=your-session-secret-key-here
```

**Important**: Make sure the environment variable is named `DATABASE_URL` (not `DIRECT_CONNECTION_DATABASE_URL`)

## Step 4: Create Required Tables

Connect to your database and run these SQL commands:

```sql
-- Connect to database
\c epm_staffing

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    role VARCHAR(50) DEFAULT 'user',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    user_id UUID REFERENCES users(id),
    location VARCHAR(255),
    salary_range VARCHAR(100),
    job_type VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User contacts table
CREATE TABLE IF NOT EXISTS user_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    contact_type VARCHAR(50),
    contact_value VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company info table
CREATE TABLE IF NOT EXISTS company_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    company_name VARCHAR(255),
    industry VARCHAR(100),
    company_size VARCHAR(50),
    website VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User address table
CREATE TABLE IF NOT EXISTS user_address (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    address_type VARCHAR(50),
    street_address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job requirements table
CREATE TABLE IF NOT EXISTS job_requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES jobs(id),
    requirement_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job responsibilities table
CREATE TABLE IF NOT EXISTS job_responsibilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES jobs(id),
    responsibility_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job benefits table
CREATE TABLE IF NOT EXISTS job_benefits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES jobs(id),
    benefit_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job categories table
CREATE TABLE IF NOT EXISTS job_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES jobs(id),
    category_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Follow users table
CREATE TABLE IF NOT EXISTS follow_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    follower_id UUID REFERENCES users(id),
    following_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower_id, following_id)
);

-- Listed jobs table
CREATE TABLE IF NOT EXISTS listed_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES jobs(id),
    client_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(job_id, client_id)
);

-- Client management info view (or table)
-- This appears to be a view that combines user and job data for admin management
CREATE OR REPLACE VIEW client_management_info AS
SELECT
    u.id,
    u.email,
    u.first_name,
    u.last_name,
    u.phone,
    u.role,
    u.is_active,
    u.created_at,
    u.updated_at,
    c.company_name,
    c.industry
FROM users u
LEFT JOIN company_info c ON u.id = c.user_id
WHERE u.role = 'client' OR u.role = 'user';
```

## Step 5: Restart Your Server

After setting up the database and updating the `.env` file:

1. Stop the current server (Ctrl+C in the terminal)
2. Restart the server:
   ```bash
   cd server
   npm run dev
   ```

## Step 6: Test the Connection

You can test if everything is working by:

1. **Using the browser**: Open your React app and click the "Fetch Data" button
2. **Using curl**:
   ```bash
   curl http://localhost:4000/api/dr/get/client_management_info?page=1
   ```

You should receive a JSON response with data instead of an error.

## Troubleshooting

### Error: "ECONNREFUSED"

- Make sure PostgreSQL service is running
- Check if port 5432 is correct
- Verify DATABASE_URL in `.env`

### Error: "password authentication failed"

- Double-check your password in DATABASE_URL
- Make sure the user exists in PostgreSQL

### Error: "database does not exist"

- Verify the database name in DATABASE_URL matches what you created
- Make sure you're connected to the correct database

### PostgreSQL service not running

- On Windows: Open Services and start "postgresql-x64-15" service
- Or use: `net start postgresql-x64-15` (adjust version number)

## Next Steps

Once your database is set up, you may want to:

1. Seed the database with initial data
2. Set up database migrations for schema changes
3. Configure backup strategies
4. Set up production database (consider using cloud services like AWS RDS, Supabase, or Neon)

## Cloud Database Options (For Production)

If you prefer not to manage PostgreSQL locally, consider these cloud options:

1. **Supabase** (https://supabase.com) - Free tier available, PostgreSQL-based
2. **Neon** (https://neon.tech) - Serverless PostgreSQL, free tier available
3. **AWS RDS** (https://aws.amazon.com/rds/postgresql/)
4. **Google Cloud SQL** (https://cloud.google.com/sql/docs/postgres)

These services provide a connection string that you can use directly in your `DATABASE_URL`.

---

Need help? Check the official PostgreSQL documentation: https://www.postgresql.org/docs/
