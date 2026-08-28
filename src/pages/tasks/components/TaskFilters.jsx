import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowDownAZ, ArrowUpZA, RotateCcw, Search, SlidersHorizontal } from "lucide-react"

export default function TaskFilters({
    search,
    onSearchChange,
    status,
    onStatusChange,
    priority,
    onPriorityChange,
    sortBy,
    onSortByChange,
    order,
    onOrderToggle,
    onReset,
    hasActiveFilters,
}) {
    return (
        <div className="bg-card border-border space-y-3 rounded-xl border p-4 shadow-xs">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="relative flex-1">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                        type="text"
                        placeholder="Search tasks by title..."
                        value={search}
                        onChange={e => onSearchChange(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:flex lg:items-center">
                    <Select value={status || "ALL"} onValueChange={onStatusChange}>
                        <SelectTrigger className="w-full lg:w-36">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Statuses</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={priority || "ALL"} onValueChange={onPriorityChange}>
                        <SelectTrigger className="w-full lg:w-36">
                            <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Priorities</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sortBy || "dueDate"} onValueChange={onSortByChange}>
                        <SelectTrigger className="w-full lg:w-40">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="dueDate">Due Date</SelectItem>
                            <SelectItem value="createdAt">Created Date</SelectItem>
                            <SelectItem value="priority">Priority</SelectItem>
                            <SelectItem value="title">Title</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex gap-1.5">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={onOrderToggle}
                            title={`Sort ${order === "asc" ? "Ascending" : "Descending"}`}
                            className="shrink-0"
                        >
                            {order === "asc" ? (
                                <ArrowDownAZ className="size-4" />
                            ) : (
                                <ArrowUpZA className="size-4" />
                            )}
                        </Button>

                        {hasActiveFilters && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={onReset}
                                title="Reset Filters"
                                className="shrink-0 text-muted-foreground hover:text-foreground"
                            >
                                <RotateCcw className="size-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
