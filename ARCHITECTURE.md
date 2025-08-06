# 🏗️ Architecture Overview - Food Ordering Platform

## 🧩 Components

### 1. Frontend (React + Vite)
- Built with React 19 + Tailwind CSS
- Handles routing via React Router
- Communicates with backend via JSON-RPC
- WebSocket client handles real-time updates
- Deployed locally or can be served via Docker

### 2. Backend (Node.js + Express)
- REST-like RPC endpoint at `/rpc`
- WebSocket server at `/ws` for real-time features
- PostgreSQL (via Supabase) used for storing orders and menu**
- Uses controller-based modular architecture
- Health check at `/health`


### 3. WebSocket Integration
- WebSocket used for real-time updates between admin and user
- Events like order status change are pushed to clients

### 4. JSON-RPC API
- Single endpoint: `/rpc`
- Methods: `placeOrder`, `getMenu`, `updateOrderStatus`, `getAnalytics`, etc.
- Decouples frontend/backend tightly

### 5. Dockerized Setup
- Multi-stage Dockerfile
- Uses `docker-compose` to run backend + frontend together
- Light and production-ready

### 6. CI/CD
- GitHub Actions for backend checks (install, lint)
- Render used for deploying backend
- Optionally deploy frontend to Netlify/Vercel

## 🗺️ Data Flow

1. User selects food from menu (React)
2. Frontend sends `placeOrder` via JSON-RPC
3. Backend stores data in PostgreSQL (Supabase)
4. Admin sees new order via WebSocket
5. Order is accepted → status is updated → pushed back to user in real time

## 🌐 Deployment

- Backend: Render (Node service)
- Frontend: Running locally / serve via `npx serve -s dist`
- CI/CD: GitHub Actions

