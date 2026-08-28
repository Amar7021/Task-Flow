# TaskFlow - Production-Quality Project Management Dashboard

TaskFlow is a modern, responsive, full-stack project management application built with **React 19**, **Vite**, **shadcn UI**, **Tailwind CSS v4**, **TanStack Query (React Query)**, **Redux Toolkit**, and **Express / MongoDB**.

---

## Table of Contents
- [Features](#features)
- [Architecture & Folder Structure](#architecture--folder-structure)
- [State Management Strategy](#state-management-strategy)
- [Performance Optimizations](#performance-optimizations)
- [Libraries Used & Rationale](#libraries-used--rationale)
- [Installation & Setup](#installation--setup)
- [Testing](#testing)
- [Known Limitations & Future Improvements](#known-limitations--future-improvements)

---

## Features

### 1. Authentication & Session Management
- Login and Register screens with form validation via Yup & React Hook Form.
- HTTP-only cookie-based authentication with session expiration handling.
- Protected routes using `AuthRootLayout` with token validation.
- User profile display with dynamic avatar initials and theme toggling (Light / Dark / System).

### 2. Interactive Dashboard
- 5 Key Performance Indicator (KPI) metrics cards:
  - **Total Tasks**
  - **Pending Tasks**
  - **In Progress Tasks**
  - **Completed Tasks**
  - **High Priority Tasks**
- **Status Overview Widget**: Dynamic progress bars visualizing task distribution and completion rate.
- **Recent Tasks Widget**: Quick overview of recently created tasks with direct links.
- Fully responsive layout across Mobile, Tablet, and Desktop.

### 3. Task Management (CRUD & Workflow)
- **Create Task**: Assign to workspace team members (filtered from user directory), priority level, status, description, and due date.
- **Edit Task**: Update any task details inline or in dialog.
- **Delete Task**: Safe confirmation dialog (`AlertDialog`).
- **View Task Details**: Modal displaying full details, assignee info, dates, and status.
- **Quick Status Changes**: Inline status update via dropdown on task rows.

### 4. Search, Filter, Sorting & Pagination
- **Search**: Debounced title search (400ms delay) preventing excessive API requests.
- **Filter**: Filter by Status (`Pending`, `In Progress`, `Completed`) and Priority (`Low`, `Medium`, `High`).
- **Sorting**: Sort by Due Date, Created Date, Priority, or Title with toggleable Ascending/Descending direction.
- **Pagination**: Server-side pagination with custom page sizes (5, 10, 25, 50 rows per page).
- **Empty States**: Context-aware empty states with filter reset and quick action triggers.

---

## Architecture & Folder Structure

TaskFlow follows a modular feature-based architecture separating presentation, business logic, and API access:

```
Task-Flow-Client/
├── src/
│   ├── api/                     # Centralized Axios instance with base configuration
│   │   └── api.js
│   ├── components/
│   │   ├── error-boundary/      # Global error boundary component
│   │   ├── layout/              # AuthRootLayout, Sidebar, Header
│   │   ├── loader/              # Full-page and inline loading spinners
│   │   └── ui/                  # Reusable shadcn/radix components (Button, Dialog, Select, Badge, Card, etc.)
│   ├── global-state/            # Redux store and slices (authSlice, appStartSlice for theme)
│   │   ├── featureSlice/
│   │   └── store.js
│   ├── hooks/                   # Custom reusable hooks (useDebounce, etc.)
│   │   └── useDebounce.js
│   ├── lib/                     # Helpers, utils, and formatters
│   │   ├── formatters.js
│   │   └── utils.js
│   ├── pages/
│   │   ├── auth/                # Login & Register pages, schema, and auth hooks
│   │   ├── dashboard/           # Dashboard page, stat cards, widgets, and hooks
│   │   │   ├── components/
│   │   │   └── service/
│   │   ├── tasks/               # Task management screen, modals, table, filters, schema, hooks
│   │   │   ├── components/
│   │   │   ├── schema/
│   │   │   └── service/
│   │   ├── users/               # User services and team assignment hooks
│   │   │   └── service/
│   │   └── not-found/           # 404 fallback page
│   ├── routes/                  # Application routing and code-split lazy routes
│   ├── test/                    # Automated unit and integration test suite
│   │   ├── api/                 # API service flow tests
│   │   ├── components/          # React component tests
│   │   ├── hooks/               # Custom hook tests
│   │   └── utils/               # Utility function tests
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
```

### Key Technical Decisions:
1. **Layered Service Pattern**: API calls are isolated into service files (`service.js`) wrapped by TanStack Query custom hooks (`service-hooks.js`). UI components never call `axios` directly.
2. **Feature Isolation**: Related schemas, services, sub-components, and hooks live alongside their feature module.
3. **No Code Comments Policy**: The codebase strictly adheres to clean self-documenting code without single-line or multi-line comments.

---

## State Management Strategy

1. **Server State (TanStack Query / React Query)**:
   - Manages asynchronous data fetching, caching, background synchronization, and automatic query invalidation.
   - Mutations (`useCreateTask`, `useUpdateTask`, `useUpdateTaskStatus`, `useDeleteTask`) automatically invalidate `["tasks"]` and `["dashboard-stats"]` query keys for real-time consistency without manual cache refetching.
2. **Client State (Redux Toolkit)**:
   - Manages synchronous application state: authenticated user session (`authSlice`) and UI theme configuration (`appStartSlice`).

---

## Performance Optimizations

1. **Debounced Search**: `useDebounce` hook buffers user keystrokes by 400ms before triggering API requests, eliminating request floods.
2. **API Query Caching & Smart Invalidation**: Configured with `staleTime: 10000` and `gcTime: 300000` in TanStack Query to prevent redundant network calls on re-renders while keeping data fresh.
3. **Component Memoization (`React.memo`, `useMemo`, `useCallback`)**:
   - `StatCard` and `TaskTable` are memoized with `React.memo` to prevent re-renders when parent states change.
   - Filter query parameters and event handlers are stabilized with `useMemo` and `useCallback`.
4. **Code Splitting & Route Lazy Loading**: Pages (`Dashboard`, `Tasks`) are dynamically imported via `React.lazy()` with Suspense boundaries, reducing initial bundle size.

---

## Libraries Used & Rationale

| Library | Version | Purpose & Rationale |
| :--- | :--- | :--- |
| **React** | `^19.2.8` | Core UI library providing reactive state and component model |
| **Vite** | `^8.2.2` | Fast modern bundler with lightning-fast HMR and optimized production builds |
| **Tailwind CSS** | `^4.3.3` | Utility-first styling with modern OKLCH color spaces and CSS variables |
| **Radix UI** | `^1.6.7` | Headless, accessible primitives (Dialog, Select, DropdownMenu, AlertDialog) |
| **TanStack Query** | `^5.102.8` | Declarative server-state synchronization, caching, and background refetching |
| **Redux Toolkit** | `^2.12.0` | Predictable global client state container for authentication and theme |
| **React Hook Form & Yup** | `^7.86.0` / `^1.7.1` | High-performance form state management with strict schema validation |
| **Lucide React** | `^1.34.0` | Consistent, lightweight SVG icons |
| **Sonner** | `^2.0.8` | Modern toast notification library for user feedback |
| **Vitest & RTL** | `^4.1.11` / `^16.3.3` | Fast Vite-native unit and component test runner |

---

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or MongoDB Atlas connection string

### 1. Clone & Setup Backend
```bash
cd Task-Flow-Server
npm install
cp .env.example .env   # Verify MONGO_URI, PORT=5000, ACCESS_TOKEN_SECRET
npm run dev
```

### 2. Setup Frontend Client
```bash
cd Task-Flow-Client
npm install
```

Configure `.env` in `Task-Flow-Client`:
```env
VITE_BASE_URL=http://localhost:5000/api/v1
```

Start the Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173` (or the port shown in your terminal) in your browser.

---

## Testing

Automated tests cover UI components, custom hooks, utilities, and API flows.

Run the test suite:
```bash
npm test
```

Watch mode:
```bash
npm run test:watch
```

Linting:
```bash
npm run lint
```

Production Build:
```bash
npm run build
```

---

## Known Limitations & Future Improvements

1. **Real-time WebSockets**: Implement Socket.io / WebSockets for multi-user live task updates across active sessions.
2. **Kanban Board View**: Add a drag-and-drop board view (e.g. using `@dnd-kit`) alongside the table view for intuitive task status transitions.
3. **Role-Based Access Control (RBAC)**: Expand user roles (Admin, Manager, Member) with granular permissions on task deletion and reassignment.
4. **File Attachments & Activity History**: Support task attachments (S3/Cloudinary) and audit trail tracking changes to task status and due dates.
