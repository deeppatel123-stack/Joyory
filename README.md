# JOYORY BEAUTY JOURNEY INTELLIGENCE
> **A smarter beauty journey, powered by what you discover, choose and experience.**

A full-stack, enterprise-grade beauty commerce and intelligence platform built with the MERN stack (MongoDB, Express.js, React, Node.js) and Tailwind CSS.

---

## Architecture Overview

The repository is organized into distinct frontend and backend directories:

```
e:/Hackathon/
├── frontend/                     # React 19 + Vite + Tailwind CSS + Lucide
│   ├── src/
│   │   ├── components/           # Common, Auth, Customer, Business & Admin components
│   │   ├── context/              # Auth, Customer, Theme & Notification Contexts
│   │   ├── pages/
│   │   │   ├── admin/            # Admin Dashboard, Products, Orders, Users, Reviews
│   │   │   ├── auth/             # Login & Signup with demo credentials
│   │   │   ├── business/         # Business Intelligence & Need Gap Radar
│   │   │   ├── customer/         # Cart, Checkout, Outcomes, Passport, Replay
│   │   │   └── public/           # Landing, Catalog, Compare, About
│   │   ├── services/             # Axios/fetch apiClient with JWT auto-injection
│   │   └── data/                 # Catalog datasets & offline fallback stores
│   ├── package.json
│   └── vite.config.js
│
├── backend/                      # Node.js + Express + MongoDB + Mongoose
│   ├── config/                   # MongoDB connection configuration
│   ├── controllers/              # Auth, Product, Cart, Order, Outcome, Decision controllers
│   ├── middleware/               # JWT authentication & RBAC authorization
│   ├── models/                   # User, Product, Category, Review, Order, Journey models
│   ├── routes/                   # REST API routes mounted under /api/*
│   ├── seed/                     # Database seeders (36 products, admin & customer users)
│   ├── data/db/                  # Embedded MongoDB data store
│   ├── .env                      # Server configuration & JWT secrets
│   ├── app.js                    # Express app configuration & middleware
│   ├── server.js                 # HTTP listener entrypoint (port 5000)
│   └── package.json
│
└── package.json                  # Workspace monorepo root scripts
```

---

## 4 Flagship Innovation Features

1. **Beauty Outcome Loop (`/customer/beauty-outcome`)**
   - Tracks products across an experiential lifecycle: *Purchased → Trying → Used → Experience Logged → Preference Updated*.
   - Captures real-world skin reactions (texture feel, breakouts, hydration shifts) and continuously recalculates preference graph weights.

2. **Personal Beauty Passport (`/customer/beauty-memory`)**
   - Cross-session beauty memory aggregating skin attributes, active ingredient affinities, fragrance sensitivities, seasonal adaptations, and an audit trail of milestone events.

3. **Beauty Decision Replay (`/customer/decision-replay`)**
   - Step-by-step decision trajectory reconstruction for previous orders: *Search Intent → Detail Inspection → Head-to-Head Comparison → Selection Drivers → Outcome Correlation*.

4. **Customer Need Gap Radar (`/business/need-gaps`)**
   - Merchandising intelligence radar correlating unfulfilled customer queries, high bounce rates, and price resistance to surface urgent inventory and formulation gaps.

---

## Default Credentials & Demo Accounts

| Role | Email | Password | Access Portals |
|---|---|---|---|
| **Administrator** | `admin@joyory.com` | `Admin@Joyory2026` | Admin Suite (`/admin`), Business Intelligence (`/business`), Customer Store |
| **Customer** | `aria.chen@joyory.com` | `Customer@Joyory2026` | Customer Experience (`/customer`), Cart & Checkout (`/cart`, `/checkout`), Decision Replay |

---

## Quick Start Guide

### 1. Root Monorepo Scripts

Run commands from the repository root (`e:/Hackathon`):

```bash
# Start Frontend Dev Server (Vite on http://localhost:5173)
npm run dev:frontend

# Start Backend API (Express on http://localhost:5000)
npm run dev:backend

# Build Frontend for Production
npm run build

# Seed Database with 36 Beauty Products & Test Accounts
npm run seed
```

### 2. Independent Backend Setup

```bash
cd backend
npm install
npm run seed     # Seeds 36 products + admin & customer users
npm run dev      # Starts server on http://localhost:5000 with nodemon
```

### 3. Independent Frontend Setup

```bash
cd frontend
npm install
npm run dev      # Starts Vite dev server on http://localhost:5173
```

---

## Live Endpoints

- **Frontend App**: `http://localhost:5173`
- **Backend Health Check**: `http://localhost:5000/api/health`
- **Product Catalog API**: `http://localhost:5000/api/products`
- **Auth Endpoint**: `http://localhost:5000/api/auth/login`
