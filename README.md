# TaskFlow

TaskFlow is a modern, responsive, application built with **React 19**, **Vite**, **shadcn UI**, **Tailwind CSS v4**, **TanStack Query (React Query)**, and **Redux Toolkit**.

---

## Table of Contents
- [Features](#features)
- [Architecture & Folder Structure](#architecture--folder-structure)
- [State Management](#state-management-strategy)
- [Performance Optimizations](#performance-optimizations)
- [Libraries Used](#libraries-used)
- [Installation & Setup](#installation--setup)
- [Testing](#testing)
- [Known Limitations & Future Improvements](#known-limitations--future-improvements)

---

## Features

### 1. Authentication & Session Management
- Login and Register screens with form validation via Yup & React Hook Form.
- Protected routes using `AuthRootLayout`.
- User profile display and theme toggling (Light / Dark / System).

### 2. Interactive Dashboard
- 5 Key Performance Indicator (KPI) metrics cards:
  - **Total Tasks**
  - **Pending Tasks**
  - **In Progress Tasks**
  - **Completed Tasks**
  - **High Priority Tasks**
- **Status Overview Widget**
- **Recent Tasks Widget**
- Fully responsive layout across Mobile, Tablet, and Desktop.

### 3. Task Management (CRUD & Workflow)
- **Create Task**: Assign to workspace team members (filtered from user directory), priority level, status, description, and due date.
- **Edit Task**: Update any task details inline or in dialog.
- **Delete Task**: Safe confirmation dialog (`AlertDialog`).
- **View Task Details**: Modal displaying full details, assignee info, dates, and status.
- **Quick Status Changes**: Inline status update via dropdown on task rows.

### 4. Search, Filter, Sorting & Pagination
- **Search**: Debounced title search (300ms delay) preventing excessive API requests.
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

---

## State Management

1. **Server State (TanStack Query / React Query)**:
   - Manages asynchronous data fetching, caching, background synchronization, and automatic query invalidation.
2. **Client State (Redux Toolkit)**:
   - Manages synchronous application state: authenticated user session (`authSlice`) and UI theme configuration (`appStartSlice`).

---

## Performance Optimizations

1. **Debounced Search**: `useDebounce` hook buffers user keystrokes by 300ms before triggering API requests, eliminating request floods.
2. **API Query Caching & Smart Invalidation**: Configured with `staleTime: 10000` and `gcTime: 300000` in TanStack Query to prevent redundant network calls on re-renders while keeping data fresh.
3. **Component Memoization (`React.memo`, `useMemo`, `useCallback`)**:
   - `StatCard` and `TaskTable` are memoized with `React.memo` to prevent re-renders when parent states change.
   - Filter query parameters and event handlers are stabilized with `useMemo` and `useCallback`.
4. **Code Splitting & Route Lazy Loading**: Pages (`Dashboard`, `Tasks`) are dynamically imported via `React.lazy()` with Suspense boundaries, reducing initial bundle size.

---

## Libraries Used

| Library | Version |
| :--- | :--- |
| **React** | `^19.2.8` |
| **Vite** | `^8.2.2` |
| **Tailwind CSS** | `^4.3.3` |
| **Radix UI** | `^1.6.7` |
| **TanStack Query** | `^5.102.8` |
| **Redux Toolkit** | `^2.12.0` |
| **React Hook Form & Yup** | `^7.86.0` / `^1.7.1` |
| **Lucide React** | `^1.34.0` |
| **Sonner** | `^2.0.8` | Modern toast notification library for user feedback |
| **Vitest & RTL** | `^4.1.11` / `^16.3.3` | Fast Vite-native unit and component test runner |

---

## Installation & Setup

### Prerequisites
- Node.js (v18+)

### 1. Setup Frontend Client
```bash
npm install
```

Configure `.env` in `Task-Flow`:
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

Automated tests cover UI components.

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

1. **Kanban Board View**: Add a drag-and-drop board view (e.g. using `@dnd-kit`) alongside the table view for intuitive task status transitions.
2. **Role-Based Access Control (RBAC)**: Expand user roles (Admin, Manager, Member) with granular permissions on task deletion and reassignment.
