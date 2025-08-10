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
- 📱 Fully Responsive Design: Ensures a seamless experience on all devices.

### Admin-Facing
- 🧑‍🍳 Kitchen dashboard: real-time view of active orders
- 🔄 Accept orders and update statuses (pending → cooking → out for delivery → delivered)
- 📊 Analytics page: orders & revenue today (live updates via WebSocket)
- 🔐 Protected routes for admin (`/kitchen`, `/analytics`) with logout

---

## ⚙️ JSON-RPC Methods

```js
getMenu({ since? })
placeOrder({ items, customer })
getOrderStatus({ orderId })
listOrders({ status?, limit? })
acceptOrder({ orderId })
updateOrderStatus({ orderId, status })
confirmPayment({ orderId, paymentRef })
```

### WebSocket Events:

```js
order_created
order_updated
analytics_update
```

---

## 🖼️ UI Preview

### 📋 Menu Page

![Menu Page-Desktop](docs/Final-UI-Screenshots/Menu.png.png)
![Menu Page-Mobile](docs/Final-UI-Screenshots/mobile-ss.jpg) ![Menu Page-Mobile](docs/Final-UI-Screenshots/mobile-pagess2.jpg.jpg)
 

### 📈 Analytics Dashboard

![Analytics Page](docs/Final-UI-Screenshots/Analytics1.png.png)

### Cart Page
![Cart Page](docs/Final-UI-Screenshots/Cart.png.png)

---

## 📁 Project Structure

```bash
/frontend        # React + Tailwind app
/backend         # Express server, JSON-RPC, WS
/migrations      # DB schema via Knex
/docs            # Postman collection + UI screenshots
```

---

## 🔗 Deployment Links

## 🚀 Live Demo & API
- 🖥️ **Live Frontend:** [https://foodie-frontend-m049.onrender.com/](https://foodie-frontend-m049.onrender.com/)
- ⚙️ **Live Backend API:** [https://foodie-1-o9h9.onrender.com/health](https://foodie-1-o9h9.onrender.com/health)
- 🎥 Demo (Download): `demo/Demo-FoodieApp.mp4`
- 📺 Demo (Google Drive): [Watch Video](https://drive.google.com/file/d/11-M6gn94w3oge9dAH5K0DZ6lA-YJMU1h/view?usp=drive_link)

---

## 🖼️ Additional Screenshots

All UI, Lighthouse scores, Docker run, Postman, and final views are available in the `/docs` folder.

Examples:

- `docs/ui-final-screens`
- `docs/lighthouse-score`
- `docs/docker-run-success`
- `docs/postman-tests`

---

## 🗓️ Progress Tracker

| Day     | Task                                      | Status    |
|---------|-------------------------------------------|-----------|
| Day 1   | Frontend scaffold                         | ✅ Done    |
| Day 2   | Menu, cart, sidebar                       | ✅ Done    |
| Day 3   | Checkout form & validation                | ✅ Done    |
| Day 4   | Backend scaffold & DB setup               | ✅ Done    |
| Day 5   | Core RPC methods                          | ✅ Done    |
| Day 6   | Tracker page + WS integration             | ✅ Done    |
| Day 7   | Kitchen dashboard + Analytics + Auth      | ✅ Done    |
| Day 8   | Dockerize & GitHub Actions CI             | ✅ Done    |
| Day 9   | Backend deployed on Render                | ✅ Done    |
| Day 10  | Docs, Lighthouse, Final push & Demo video | ✅ Done    |
| **Day 11** | **Finalize production deployment & fix environment issues** | **✅ Done** |

---

## 💡 Redux Toolkit Rationale

I considered using Redux Toolkit during development, but decided not to include it in this version because:

- The app is currently small in scale, and using `useState`, `useEffect`, and `localStorage` has been sufficient for managing state.
- Real-time updates (like order tracking and analytics) are handled effectively through WebSocket, without needing global state.
- The codebase is modular, clean, and works well as-is — adding Redux at this point would add unnecessary complexity.

---

##  What about Zustand?

I also considered Zustand as a lightweight alternative for state management.

However, for this project, the built-in React hooks were enough to cover all state-related needs, so I avoided adding an extra dependency unnecessarily.

---

## 🔍 Note for Reviewers

I’m familiar with Redux Toolkit and Zustand, and I can implement either when the use case justifies it. 

---

## 🚀 Getting Started Locally

### 1. Clone and setup backend

```bash
cd backend
npm install
npx knex migrate:latest
npm run dev
```

### 2. Run frontend locally

```bash
cd frontend
pnpm install
pnpm run dev
```

Or to serve final build:

```bash
npm run build
npx serve -s dist
```

---

## 📝 Notes

- Backend and frontedn both deployed successfully to Render.
- The full-stack application is live on Render. The initial Vite deployment issues on the frontend were resolved by migrating the package manager from npm to pnpm, which provided a more reliable build process.
- Docker setup partially worked — backend ran, but frontend build caused issues, so it's commented out in backend`src/index.js`.

---

## 🛠️ Technologies Used

| Tech             | Purpose                    |
|------------------|-----------------------------|
| React 18         | Frontend UI                 |
| Tailwind CSS     | Styling                     |
| Node.js + Express| Backend server & API        |
| PostgreSQL + Knex| Database + Migrations       |
| WebSocket        | Real-time order tracking    |
| JSON-RPC 2.0     | API structure               |
| Docker           | Containerization            |
| GitHub Actions   | CI/CD pipeline              |

---

## 🚧 Future Improvements (Optional)

- 💳 Integrate real payment gateway (Stripe, Razorpay, etc.)
- 📦 Pagination + filtering on order/admin lists


 
