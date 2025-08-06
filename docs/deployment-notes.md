# Deployment Notes

## Backend Deployment

- **Platform:** Render.com
- **Environment:** Node.js
- **Working:** ✅ Successfully deployed using Render
- **Health Check:** Added `/health` route in `index.js`
- **Environment Variables:** `MONGO_URL` changed to `SUPABASE_URL` and `SUPABASE_KEY` for PostgreSQL
- **Build Command:** `npm install`
- **Start Command:** `node src/index.js`

## Frontend Deployment (Failed Attempts)

### 1. 🚫 Render Static Site (via GitHub)
- **Issue:** `vite` binary permission denied
- **Tried Fixes:**
  - Added `vite` to dependencies instead of devDependencies
  - Added `.npmrc` with `unsafe-perm=true`
  - Modified build script with `npx vite build`
- **Still failed**, due to permission error during build.

### 2. 🚫 Vercel (via GitHub)
- **Issue:** Similar `vite` binary permission error
- **Reason:** Vite build script was blocked due to permissions

### 3. Local Development Success
- Frontend works perfectly locally using:
  ```bash
  npm run build
  npx serve -s dist

  # Deployment Notes

## Backend Deployment

- **Platform:** Render.com
- **Environment:** Node.js
- **Working:** ✅ Successfully deployed using Render
- **Health Check:** Added `/health` route in `index.js`
- **Environment Variables:** `MONGO_URL` changed to `SUPABASE_URL` and `SUPABASE_KEY` for PostgreSQL
- **Build Command:** `npm install`
- **Start Command:** `node index.js`

## Frontend Deployment (Failed Attempts)

### 1. 🚫 Render Static Site (via GitHub)
- **Issue:** `vite` binary permission denied
- **Tried Fixes:**
  - Added `vite` to dependencies instead of devDependencies
  - Added `.npmrc` with `unsafe-perm=true`
  - Modified build script with `npx vite build`
- **Still failed**, due to permission error during build.

### 2. 🚫 Vercel (via GitHub)
- **Issue:** Similar `vite` binary permission error
- **Reason:** Vite build script was blocked due to permissions

### 3. ✅ Local Development Success
- Frontend works perfectly locally using:
  ```bash
  npm run build
  npx serve -s dist

 Backend works via
 npm run dev

### Docker Setup
Docker builds for backend + frontend added via infra/docker-compose.yml

- **Issue:** Docker build failed when frontend dist/ was copied

To fix temporarily:

Commented out frontend-serving code in index.js

Backend still deployed successfully
