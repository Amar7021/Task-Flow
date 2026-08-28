import { lazy } from "react"

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"))
const Tasks = lazy(() => import("../pages/tasks/Tasks"))

export { Dashboard, Tasks }
