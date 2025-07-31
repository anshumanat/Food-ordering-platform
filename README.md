 
# 🍽️ Food Ordering Platform

A full-stack food ordering platform with real-time order tracking, built with:

- React 18 + Tailwind CSS (frontend)
- Node.js + Express (backend)
- PostgreSQL + Knex (database)
- WebSocket for real-time updates
- Docker + GitHub Actions (infra)

---

## ✅ Features (So Far)

- 📄 Menu grid UI with mock data
- ➕ Add/remove items from cart
- 🔢 Quantity updates
- 🛒 Cart preview sidebar with animation
- 📦 Cart page with clear cart & total
- 🔁 Local storage cart persistence
- 🧠 Dynamic menu loaded from PostgreSQL via JSON-RPC
- 🧾 placeOrder & listOrders RPC methods implemented**
- 🧪 Tested RPCs (`getMenu`, `placeOrder`, `listOrders`) using Postman
- 🧰 Express backend with connected PostgreSQL DB and migrations

---

## 📁 Project Structure

/frontend # React + Tailwind app
/backend # Express server, JSON-RPC, WebSocket
/infra # Docker, CI/CD config


---

## 🗓️ Progress

| Day   | Task                          | Status         |
|-------|-------------------------------|----------------|
| Day 1 | Frontend scaffold             | ✅ Done         |
| Day 2 | Menu, cart, sidebar           | ✅ Done         |
| Day 3 | Checkout form & validation    | ✅ Done         |
| Day 4 | Backend scaffold & DB setup   | ✅ Done         |
| Day 5 | Core RPC methods              | ✅ Done         |
| Day 6 |                               | In Progress      |

---

## 🚀 Getting Started

### Frontend And Backend

```bash
cd frontend
npm install
npm run dev


cd backend
npm install
npx knex migrate:latest
npm run dev

