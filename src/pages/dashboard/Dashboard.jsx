import { useDashboardStats } from "./service/service-hooks"
import { useTasks } from "../tasks/service/service-hooks"
import StatCard from "./components/StatCard"
import RecentTasksWidget from "./components/RecentTasksWidget"
import { Button } from "@/components/ui/button"
import {
    CheckCircle2,
    Clock,
    Flame,
    ListTodo,
    Plus,
    Timer,
} from "lucide-react"
import { Link } from "react-router"
import PageLoader from "@/components/loader/Loader"

const Dashboard = () => {
    const { data: stats, isLoading: statsLoading } = useDashboardStats()
    const { data: recentData, isLoading: recentLoading } = useTasks({
        limit: 5,
        sortBy: "createdAt",
        order: "desc",
    })

    if (statsLoading) {
        return <PageLoader />
    }

    const recentTasks = recentData?.data?.tasks || []

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Dashboard
                        </h1>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Button size="sm" asChild className="gap-1.5 shadow-xs">
                            <Link to="/tasks?create=true">
                                <Plus className="size-4" />
                                <span>New Task</span>
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <StatCard
                        title="Total Tasks"
                        value={stats?.totalTasks ?? 0}
                        icon={ListTodo}
                        colorVariant="primary"
                    />
                    <StatCard
                        title="Pending"
                        value={stats?.pendingTasks ?? 0}
                        icon={Clock}
                        colorVariant="warning"
                    />
                    <StatCard
                        title="In Progress"
                        value={stats?.inProgressTasks ?? 0}
                        icon={Timer}
                        colorVariant="info"
                    />
                    <StatCard
                        title="Completed"
                        value={stats?.completedTasks ?? 0}
                        icon={CheckCircle2}
                        colorVariant="success"
                    />
                    <StatCard
                        title="High Priority"
                        value={stats?.highPriorityTasks ?? 0}
                        icon={Flame}
                        colorVariant="destructive"
                    />
                </div>
                <div className="w-full">
                    <div className="w-full">
                        <RecentTasksWidget
                            tasks={recentTasks}
                            isLoading={recentLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
