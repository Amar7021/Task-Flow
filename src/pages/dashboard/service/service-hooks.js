import { useQuery } from "@tanstack/react-query"
import { getDashboardStatsService } from "./service"

export const useDashboardStats = () => {
    return useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: getDashboardStatsService,
        select: data => data?.data || {
            totalTasks: 0,
            pendingTasks: 0,
            inProgressTasks: 0,
            completedTasks: 0,
            highPriorityTasks: 0,
        },
    })
}
