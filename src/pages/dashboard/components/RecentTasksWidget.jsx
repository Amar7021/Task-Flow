import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate, getPriorityBadgeVariant, getStatusBadgeVariant } from "@/lib/formatters"
import { ArrowRight, Calendar, User as UserIcon } from "lucide-react"
import { Link } from "react-router"

export default function RecentTasksWidget({ tasks = [] }) {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                    <CardTitle>Recent Tasks</CardTitle>
                    <CardDescription>
                        Latest tasks created or assignde
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {tasks.length === 0 ? (
                    <div className="text-muted-foreground flex h-44 flex-col items-center justify-center text-center text-sm">
                        <p>No recent tasks found.</p>
                        <Button size="sm" variant="outline" className="mt-3" asChild>
                            <Link to="/tasks">Create your first task</Link>
                        </Button>
                    </div>
                ) : (
                    tasks.map(task => (
                        <div
                            key={task._id}
                            className="border-border hover:bg-muted/40 flex flex-col justify-between gap-3 rounded-lg border p-3.5 transition-colors sm:flex-row sm:items-center"
                        >
                            <div className="min-w-0 flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium tracking-tight truncate text-sm">
                                        {task.title}
                                    </span>
                                    <Badge variant={getPriorityBadgeVariant(task.priority)}>
                                        {task.priority}
                                    </Badge>
                                </div>
                                <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
                                    <span className="flex items-center gap-1">
                                        <UserIcon className="size-3.5" />
                                        {task.assignedUser?.name || task.assignedUser?.username || task.assignedUser?.email || "Unassigned"}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="size-3.5" />
                                        Due {formatDate(task.dueDate)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center justify-between sm:justify-end gap-2">
                                <Badge variant={getStatusBadgeVariant(task.status)}>
                                    {task.status}
                                </Badge>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    )
}
