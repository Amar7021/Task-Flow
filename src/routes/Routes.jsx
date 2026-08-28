import ErrorBoundary from "@/components/error-boundary/ErrorBoundary"
import AuthRootLayout from "@/components/layout/AuthRootLayout"
import Login from "@/pages/auth/Login"
import Register from "@/pages/auth/Register"
import NotFound from "@/pages/not-found/NotFound"
import { createBrowserRouter } from "react-router"
import { Dashboard, Tasks } from "./lazyRoutes"

const router = createBrowserRouter([
    {
        Component: AuthRootLayout,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: "/",
                Component: Dashboard,
            },
            {
                path: "/tasks",
                Component: Tasks,
            },
        ],
    },
    {
        path: "/login",
        Component: Login,
        errorElement: <ErrorBoundary />,
    },
    {
        path: "/register",
        Component: Register,
        errorElement: <ErrorBoundary />,
    },
    {
        path: "*",
        Component: NotFound,
    },
])

export default router
