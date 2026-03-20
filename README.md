# TaskFlow – Task Management System

A full-stack Task Management System built for the **Earnest Data Analytics Recruitment Assessment**.

## Overview

TaskFlow allows users to register, log in, and manage their personal tasks with full CRUD operations. It is built with a **Node.js + TypeScript backend** and a **Next.js frontend**, following best practices in authentication, security, and responsive UI design.

---

## Tech Stack

### Backend (Track A – Part 1)
| Technology | Purpose |
|---|---|
| Node.js + TypeScript | Runtime & type safety |
| Express.js | REST API framework |
| Prisma ORM | Database access layer |
| SQLite | SQL database (easily swappable with PostgreSQL) |
| JWT (Access + Refresh Tokens) | Stateless authentication |
| bcryptjs | Password hashing |
| express-validator | Input validation |

### Frontend (Track A – Part 2)
| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | React framework |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Axios | HTTP client with interceptors |
| React Hook Form | Form management |
| react-hot-toast | Toast notifications |
| date-fns | Date formatting |
| lucide-react | Icons |

---

## Features

### Authentication
- User registration with name, email, and password
- Secure login with JWT Access Token (15 min) + Refresh Token (7 days)
- Automatic token refresh via Axios interceptors (silent re-auth)
- Logout (invalidates refresh token server-side)
- Password hashing with bcrypt (12 rounds)

### Task Management (CRUD)
- Create tasks with title, description, status, priority, and due date
- View all tasks (paginated, 9 per page)
- Edit any task inline via modal
- Delete with confirmation dialog
- Toggle task status: `PENDING → IN_PROGRESS → COMPLETED → PENDING`
- Tasks are scoped to the logged-in user

### Filtering & Search
- Filter by **status** (Pending / In Progress / Completed)
- Filter by **priority** (Low / Medium / High)
- Debounced **search by title**
- Combine filters simultaneously

### Responsive UI
- Works on mobile, tablet, and desktop
- Stats dashboard (total, pending, in progress, completed)
- Clean card grid layout
- Toast notifications for all actions

---

## API Endpoints

### Auth Routes (`/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login and receive tokens | No |
| POST | `/auth/refresh` | Refresh access token | No |
| POST | `/auth/logout` | Logout (invalidate refresh token) | Yes |
| GET | `/auth/me` | Get current user profile | Yes |

### Task Routes (`/tasks`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/tasks` | Get all tasks (paginated, filtered, searched) | Yes |
| POST | `/tasks` | Create a new task | Yes |
| GET | `/tasks/:id` | Get a single task | Yes |
| PATCH | `/tasks/:id` | Update a task | Yes |
| DELETE | `/tasks/:id` | Delete a task | Yes |
| PATCH | `/tasks/:id/toggle` | Toggle task status | Yes |

#### Query Parameters for `GET /tasks`
| Param | Type | Description |
|---|---|---|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10, max: 50) |
| `status` | string | Filter: `PENDING`, `IN_PROGRESS`, `COMPLETED` |
| `priority` | string | Filter: `LOW`, `MEDIUM`, `HIGH` |
| `search` | string | Search by task title |
| `sortBy` | string | Field to sort by (default: `createdAt`) |
| `sortOrder` | string | `asc` or `desc` (default: `desc`) |

---

## Project Structure

```
task-management-system/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # DB schema (User, Task models)
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts  # Register, login, refresh, logout
│   │   │   └── task.controller.ts  # Full CRUD + toggle + pagination
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts  # JWT authentication guard
│   │   │   └── error.middleware.ts # Global error handler
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── task.routes.ts
│   │   ├── utils/
│   │   │   ├── jwt.ts              # Token generation & verification
│   │   │   └── prisma.ts           # Prisma client singleton
│   │   └── index.ts               # Express app entry point
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── auth/
    │   │   │   ├── login/page.tsx   # Login page
    │   │   │   └── register/page.tsx # Register page
    │   │   ├── dashboard/page.tsx   # Main task dashboard
    │   │   ├── globals.css
    │   │   ├── layout.tsx           # Root layout with providers
    │   │   └── page.tsx             # Redirect entry point
    │   ├── components/
    │   │   ├── Navbar.tsx
    │   │   └── tasks/
    │   │       ├── TaskCard.tsx     # Task display card
    │   │       ├── TaskModal.tsx    # Create/edit modal
    │   │       └── ConfirmDialog.tsx # Delete confirmation
    │   ├── hooks/
    │   │   └── useAuth.tsx          # Auth context & hook
    │   ├── lib/
    │   │   ├── api.ts               # Axios instance + token refresh interceptor
    │   │   ├── auth.ts              # Auth API calls
    │   │   └── tasks.ts             # Tasks API calls
    │   └── types/
    │       └── index.ts             # Shared TypeScript types
    ├── .env.example
    ├── next.config.js
    ├── package.json
    ├── tailwind.config.js
    └── tsconfig.json
```

---

## Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/task-management-system.git
cd task-management-system
```

### 2. Setup Backend
```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env and set your JWT secrets

# Run database migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Start the development server
npm run dev
```
Backend runs at: `http://localhost:5000`

### 3. Setup Frontend
```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:5000

# Start the development server
npm run dev
```
Frontend runs at: `http://localhost:3000`

---

## Environment Variables

### Backend `.env`
```env
DATABASE_URL="file:./dev.db"
JWT_ACCESS_SECRET="your-super-secret-access-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
PORT=5000
CLIENT_URL="http://localhost:3000"
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Security Highlights
- Passwords hashed with **bcrypt** (12 rounds) — never stored in plaintext
- **Short-lived access tokens** (15 min) with automatic silent refresh
- Refresh tokens stored in DB — instantly revocable on logout
- All task endpoints verify the **JWT and user ownership** before any operation
- Input validated on both client (React Hook Form) and server (express-validator)
- CORS restricted to the frontend origin

---

## Assessment Compliance

| Requirement | Status |
|---|---|
| Node.js + TypeScript backend | ✅ |
| Prisma ORM + SQLite | ✅ |
| JWT Access + Refresh Tokens | ✅ |
| bcrypt password hashing | ✅ |
| `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout` | ✅ |
| Task CRUD endpoints | ✅ |
| Pagination, filtering, search on `GET /tasks` | ✅ |
| `/tasks/:id/toggle` endpoint | ✅ |
| Proper HTTP status codes & error handling | ✅ |
| Next.js App Router + TypeScript frontend | ✅ |
| Login & Register pages | ✅ |
| Token storage + auto-refresh logic | ✅ |
| Task dashboard with filtering & search | ✅ |
| Responsive design | ✅ |
| CRUD UI + toast notifications | ✅ |

---
