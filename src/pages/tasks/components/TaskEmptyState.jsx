import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function TaskEmptyState({
    hasActiveFilters,
    onCreateTask,
}) {
    return (
        <div className="bg-card border-border flex min-h-[300px] flex-col items-center justify-center rounded-xl border p-8 text-center shadow-xs">
            <h3 className="mt-4 text-base font-semibold">
                {hasActiveFilters ? "No matching tasks" : "No tasks yet"}
            </h3>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                <Button size="sm" onClick={onCreateTask} className="gap-1.5">
                    <Plus className="size-4" />
                    Create Task
                </Button>
            </div>
        </div>
    )
}
