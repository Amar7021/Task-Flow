import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TaskPagination({
    currentPage = 1,
    totalPages = 1,
    totalCount = 0,
    limit = 10,
    onPageChange,
    onLimitChange,
}) {
    if (totalCount === 0) return null

    const start = (currentPage - 1) * limit + 1
    const end = Math.min(currentPage * limit, totalCount)

    return (
        <div className="flex flex-col items-center justify-between gap-4 py-2 sm:flex-row">
            <div className="text-muted-foreground text-xs">
                Showing <span className="font-medium text-foreground">{start}</span> to{" "}
                <span className="font-medium text-foreground">{end}</span> of{" "}
                <span className="font-medium text-foreground">{totalCount}</span> tasks
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs">Rows:</span>
                    <Select
                        value={String(limit)}
                        onValueChange={val => onLimitChange(Number(val))}
                    >
                        <SelectTrigger className="h-8 w-16 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="size-4" />
                    </Button>
                    <span className="text-muted-foreground px-2 text-xs">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        aria-label="Next page"
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
