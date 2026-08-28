import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
    formatDate,
    formatDateTime,
    getPriorityBadgeVariant,
    getStatusBadgeVariant,
} from "@/lib/formatters"
import { Calendar, Clock, User } from "lucide-react"

export default function TaskDetailsModal({ open, onOpenChange, task }) {
    if (!task) return null

    const assigned = task.assignedUser
    const assignedName =
        assigned?.name || assigned?.username || assigned?.email || "Unassigned"
    const assignedEmail = assigned?.email || ""

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 pr-6">
                        <Badge variant={getStatusBadgeVariant(task.status)}>
                            {task.status}
                        </Badge>
                        <Badge variant={getPriorityBadgeVariant(task.priority)}>
                            {task.priority} Priority
                        </Badge>
                    </div>
                    <DialogTitle className="text-xl font-bold">
                        {task.title}
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        Created on {formatDateTime(task.createdAt)}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-2">
                    <div className="space-y-1.5">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Description
                        </h4>
                        <div className="bg-muted/40 border-border rounded-lg border p-3.5 text-sm leading-relaxed whitespace-pre-wrap">
                            {task.description || "No description provided."}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="border-border rounded-lg border p-3.5">
                            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-1.5">
                                <User className="size-3.5" /> Assigned User
                            </span>
                            <p className="font-semibold text-sm">{assignedName}</p>
                            {assignedEmail && (
                                <p className="text-xs text-muted-foreground truncate">
                                    {assignedEmail}
                                </p>
                            )}
                        </div>

                        <div className="border-border rounded-lg border p-3.5">
                            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-1.5">
                                <Calendar className="size-3.5" /> Due Date
                            </span>
                            <p className="font-semibold text-sm">
                                {formatDate(task.dueDate)}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                <Clock className="size-3" /> Updated {formatDate(task.updatedAt)}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
