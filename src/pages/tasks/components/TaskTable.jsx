import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    formatDate,
    getPriorityBadgeVariant,
    getStatusBadgeVariant,
} from "@/lib/formatters"
import {
    Calendar,
    Edit,
    Eye,
    MoreHorizontal,
    Trash2,
    User as UserIcon,
} from "lucide-react"

const TaskTable = React.memo(function TaskTable({
    tasks = [],
    onView,
    onEdit,
    onDelete,
    onStatusChange,
}) {
    return (
        <div className="space-y-4">
            <div className="hidden md:block overflow-hidden rounded-xl border border-border bg-card shadow-xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-border bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-3.5">Task</th>
                                <th className="px-5 py-3.5">Assigned To</th>
                                <th className="px-5 py-3.5">Priority</th>
                                <th className="px-5 py-3.5">Status</th>
                                <th className="px-5 py-3.5">Due Date</th>
                                <th className="px-5 py-3.5">Created</th>
                                <th className="px-5 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {tasks.map(task => {
                                const user = task.assignedUser
                                const userName =
                                    user?.name ||
                                    user?.username ||
                                    user?.email ||
                                    "Unassigned"

                                return (
                                    <tr
                                        key={task._id}
                                        className="transition-colors hover:bg-muted/30"
                                    >
                                        <td className="px-5 py-4 max-w-xs">
                                            <div className="font-semibold text-foreground truncate">
                                                {task.title}
                                            </div>
                                            {task.description && (
                                                <div className="text-xs text-muted-foreground truncate max-w-xs mt-0.5">
                                                    {task.description}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold uppercase">
                                                    {userName.charAt(0)}
                                                </div>
                                                <span className="text-sm font-medium">
                                                    {userName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <Badge
                                                variant={getPriorityBadgeVariant(
                                                    task.priority
                                                )}
                                            >
                                                {task.priority}
                                            </Badge>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <div className="w-32">
                                                <Select
                                                    value={task.status}
                                                    onValueChange={val =>
                                                        onStatusChange(
                                                            task._id,
                                                            val
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="h-7 text-xs">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Pending">
                                                            Pending
                                                        </SelectItem>
                                                        <SelectItem value="In Progress">
                                                            In Progress
                                                        </SelectItem>
                                                        <SelectItem value="Completed">
                                                            Completed
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-muted-foreground text-xs">
                                            {formatDate(task.dueDate)}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-muted-foreground text-xs">
                                            {formatDate(task.createdAt)}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-8"
                                                    >
                                                        <MoreHorizontal className="size-4" />
                                                        <span className="sr-only">
                                                            Actions
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>
                                                        Actions
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            onView(task)
                                                        }
                                                    >
                                                        <Eye className="size-4 mr-2" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            onEdit(task)
                                                        }
                                                    >
                                                        <Edit className="size-4 mr-2" />
                                                        Edit Task
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        onClick={() =>
                                                            onDelete(task)
                                                        }
                                                    >
                                                        <Trash2 className="size-4 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 md:hidden">
                {tasks.map(task => {
                    const user = task.assignedUser
                    const userName =
                        user?.name ||
                        user?.username ||
                        user?.email ||
                        "Unassigned"

                    return (
                        <div
                            key={task._id}
                            className="bg-card border border-border rounded-xl p-4 shadow-xs space-y-3"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="space-y-1">
                                    <h3 className="font-semibold text-foreground text-base">
                                        {task.title}
                                    </h3>
                                    {task.description && (
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {task.description}
                                        </p>
                                    )}
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="size-8 shrink-0"
                                        >
                                            <MoreHorizontal className="size-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() => onView(task)}
                                        >
                                            <Eye className="size-4 mr-2" />
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => onEdit(task)}
                                        >
                                            <Edit className="size-4 mr-2" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            variant="destructive"
                                            onClick={() => onDelete(task)}
                                        >
                                            <Trash2 className="size-4 mr-2" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <Badge
                                    variant={getPriorityBadgeVariant(
                                        task.priority
                                    )}
                                >
                                    {task.priority}
                                </Badge>
                                <Badge
                                    variant={getStatusBadgeVariant(
                                        task.status
                                    )}
                                >
                                    {task.status}
                                </Badge>
                            </div>

                            <div className="border-t border-border pt-3 flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <UserIcon className="size-3.5" />
                                    <span>{userName}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="size-3.5" />
                                    <span>Due {formatDate(task.dueDate)}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
})

export default TaskTable
