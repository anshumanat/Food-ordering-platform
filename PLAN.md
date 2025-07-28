# PLAN.md

## Milestones by Day

| Day    | Goal                         | Deliverable                     |
| ------ | ---------------------------- | ------------------------------- |
| Day 0  | Kickoff & planning           | PLAN.md                         |
| Day 1  | Frontend scaffold            | Empty React/Tailwind app        |
| Day 2  | Menu & Cart UI               | Mock menu grid + cart           |
| Day 3  | Checkout form & validation   | Checkout page stub              |
| Day 4  | Backend scaffold & DB schema | Express app + migrations setup  |
| Day 5  | Core RPC methods             | getMenu, placeOrder, listOrders |
| Day 6  | WebSocket & real-time flows  | order_created/updated events    |
| Day 7  | Analytics widget integration | Historical + live updates       |
| Day 8  | Testing & Dockerization      | Unit tests, Dockerfiles         |
| Day 9  | Deployment & CI/CD           | Live URLs, GitHub Actions CI    |
| Day 10 | Polish, docs & demo          | README.md, ARCHITECTURE.md, GIF |

## Top Risks & Mitigations

| Risk                     | Why it could be a problem                                           | What I plan to do about it                                         |
|--------------------------|---------------------------------------------------------------------|---------------------------------------------------------------------|
| WebSocket reconnection   | If the WebSocket drops and doesn’t reconnect, real-time updates like order status or new orders won’t show up. | I’ll build in reconnection with exponential backoff and test it early. |
| Docker CI failures       | If my Docker setup or CI scripts are broken, deployment might not work or crash in production. | I’ll start with basic Dockerfiles and test them early with simple healthchecks. |
| DB migration tool choice | If I waste time figuring out a migration tool I’ve never used, it could slow me down. | I’ll stick with Knex since I’m already somewhat familiar with it.     |

## Assumptions & Tools

- **Frontend:** React 18 + Vite (or Next.js 14) with Tailwind 3.4
- **State Management:** Redux Toolkit (trade-offs documented)
- **Backend:** Node 20 + Express 4/5, JSON-RPC 2.0 over HTTP
- **Real-Time:** Native WebSocket (ws) with ping/pong heartbeat
- **Database:** PostgreSQL 15+ with Knex for migrations
- **Deployment:** Docker + docker-compose for local dev; Fly.io (or Railway/Vercel + Neon) for production
- **CI/CD:** GitHub Actions for lint, test, build, deploy
- **Testing:** Jest/Vitest for backend; React Testing Library for frontend

## Repository

[https://github.com/anshumanat/Food-ordering-platform](https://github.com/anshumanat/Food-ordering-platform)

## Final Submission Checklist

- [ ] Public GitHub repo with folders /frontend, /backend, /infra
- [ ] Live URLs (frontend, /rpc, /ws)
- [ ] SQL migrations & seeds
- [ ] Postman / cURL samples
- [ ] Root README.md, Architecture docs
- [ ] CI passing badge (optional)
- [ ] Demo GIF/video
- [ ] Loom/YouTube walkthrough (optional)

---

> *This PLAN.md will guide the 10-day sprint and help track daily progress.*
