# 🍽️ Food Ordering Platform

A full-stack food ordering platform with real-time order tracking and kitchen management — built with:

- ⚛️ React 18 + Tailwind CSS (frontend)
- 🧠 Node.js + Express (backend)
- 🗄️ PostgreSQL + Knex (database)
- 🔌 WebSocket for real-time updates
- 📦 JSON-RPC 2.0 APIs
- 🐳 Docker + GitHub Actions (infra)

---

## ✅ Features (So Far)

### User-Facing
- 📄 Browse menu by category (loaded from DB)
- ➕ Add/remove items from cart (with quantity update)
- 🛒 Cart preview sidebar with animation
- 🔁 Cart persisted in `localStorage`
- 📋 Checkout form with validation
- 📦 Order confirmation screen
- 🚚 Real-time order tracking with live status updates (via WebSocket)

### Admin-Facing
- 🧑‍🍳 Kitchen dashboard: real-time view of active orders
- 🔄 Accept orders and update statuses (pending → cooking → out for delivery → delivered)
- 📊 Analytics page: orders & revenue today (live updates via WebSocket)
- 🔐 Protected routes for admin (`/kitchen`, `/analytics`) with logout

---

## ⚙️ JSON-RPC Methods

- `getMenu({ since? })`
- `placeOrder({ items, customer })`
- `getOrderStatus({ orderId })`
- `listOrders({ status?, limit? })`
- `acceptOrder({ orderId })`
- `updateOrderStatus({ orderId, status })`
- `confirmPayment({ orderId, paymentRef })`
- WebSocket events: `order_created`, `order_updated`, `analytics_update`

---

## 📁 Project Structure

/frontend # React + Tailwind app
/backend # Express server, JSON-RPC, WS
/migrations # DB schema via Knex
/docs # Postman collection + UI screenshots



---

## 🗓️ Progress

| Day   | Task                                      | Status   |
|-------|-------------------------------------------|----------|
| Day 1 | Frontend scaffold                         | ✅ Done   |
| Day 2 | Menu, cart, sidebar                       | ✅ Done   |
| Day 3 | Checkout form & validation                | ✅ Done   |
| Day 4 | Backend scaffold & DB setup               | ✅ Done   |
| Day 5 | Core RPC methods                          | ✅ Done   |
| Day 6 | Tracker page + WS integration             | ✅ Done   |
| Day 7 | Kitchen dashboard + Analytics + Auth      | ✅ Done   |

---

## 💡 Redux Toolkit Rationale

I considered using **Redux Toolkit** during development, but decided not to include it in this version because:

- The app is currently small in scale, and using `useState`, `useEffect`, and `localStorage` has been sufficient for managing state.
- Real-time updates (like order tracking and analytics) are handled effectively through **WebSocket**, without needing global state.
- The codebase is modular, clean, and works well as-is — adding Redux at this point would add unnecessary complexity.

### 🌀 What about Zustand?

I also considered **Zustand** as a lightweight alternative for state management.  
However, for this project, the built-in React hooks were enough to cover all state-related needs, so I avoided adding an extra dependency unnecessarily.

### 🔍 Note for Reviewers:

> I’m familiar with Redux Toolkit , and I can implement when the use case justifies it.  
> For this project, I intentionally kept things lightweight and simple.  
> If the app scales or shared state becomes more complex, I can integrate global state management tools in future iterations.


## 🚀 Getting Started

### 1. Backend and Frontend

```bash
cd backend
npm install
npx knex migrate:latest
npm run dev


```bash
cd frontend
npm install
npm run dev

 
