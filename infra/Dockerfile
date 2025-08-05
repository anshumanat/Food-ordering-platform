
### 1️⃣ Build Frontend ###
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend
COPY ../frontend/package*.json ./
RUN npm install
COPY ../frontend/ ./
RUN npm run build


### 2️⃣ Backend with frontend build copied ###
FROM node:18-alpine

WORKDIR /app

# Install backend deps
COPY ../backend/package*.json ./backend/
RUN cd backend && npm install

# Copy backend code
COPY ../backend ./backend

# Copy frontend dist into backend's public folder
COPY --from=frontend-build /app/frontend/dist ./backend/public

# Expose backend port
EXPOSE 4000

# Default command
CMD ["node", "backend/src/index.js"]
