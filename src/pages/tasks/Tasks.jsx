import { useState, useCallback, useMemo } from "react"
import { useSearchParams } from "react-router"
import { useDebounce } from "@/hooks/useDebounce"
import {
    useTasks,
    useCreateTask,
    useUpdateTask,
    useUpdateTaskStatus,
    useDeleteTask,
} from "./service/service-hooks"
import TaskFilters from "./components/TaskFilters"
import TaskTable from "./components/TaskTable"
import TaskPagination from "./components/TaskPagination"
import TaskModal from "./components/TaskModal"
import TaskDetailsModal from "./components/TaskDetailsModal"
import TaskDeleteDialog from "./components/TaskDeleteDialog"
import TaskEmptyState from "./components/TaskEmptyState"
import { Button } from "@/components/ui/button"
import { Plus, RotateCw } from "lucide-react"

export default function Tasks() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchInput, setSearchInput] = useState(
        searchParams.get("search") || ""
    )
    const debouncedSearch = useDebounce(searchInput, 400)

    const [statusFilter, setStatusFilter] = useState(
        searchParams.get("status") || "ALL"
    )
    const [priorityFilter, setPriorityFilter] = useState(
        searchParams.get("priority") || "ALL"
    )
    const [sortBy, setSortBy] = useState(
        searchParams.get("sortBy") || "dueDate"
    )
    const [order, setOrder] = useState(searchParams.get("order") || "asc")
    const [page, setPage] = useState(
        parseInt(searchParams.get("page"), 10) || 1
    )
    const [limit, setLimit] = useState(
        parseInt(searchParams.get("limit"), 10) || 10
    )

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(
        () => searchParams.get("create") === "true"
    )
    const [editingTask, setEditingTask] = useState(null)
    const [viewingTask, setViewingTask] = useState(null)
    const [deletingTask, setDeletingTask] = useState(null)

    const handleCreateModalOpenChange = useCallback(
        open => {
            setIsCreateModalOpen(open)
            if (!open && searchParams.get("create") === "true") {
                const newParams = new URLSearchParams(searchParams)
                newParams.delete("create")
                setSearchParams(newParams, { replace: true })
            }
        },
        [searchParams, setSearchParams]
    )

    const queryParams = useMemo(() => {
        const params = {
            page,
            limit,
            sortBy,
            order,
        }
        if (debouncedSearch.trim()) params.search = debouncedSearch.trim()
        if (statusFilter && statusFilter !== "ALL") params.status = statusFilter
        if (priorityFilter && priorityFilter !== "ALL")
            params.priority = priorityFilter
        return params
    }, [page, limit, sortBy, order, debouncedSearch, statusFilter, priorityFilter])

    const {
        data: responseData,
        isLoading
    } = useTasks(queryParams)

    const tasks = responseData?.data?.tasks || []
    const pagination = responseData?.data?.pagination || {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
    }

    const { mutate: createTask, isPending: isCreating } = useCreateTask({
        onSuccess: () => handleCreateModalOpenChange(false),
    })

    const { mutate: updateTask, isPending: isUpdating } = useUpdateTask({
        onSuccess: () => setEditingTask(null),
    })

    const { mutate: updateStatus } = useUpdateTaskStatus()

    const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask({
        onSuccess: () => setDeletingTask(null),
    })

    const handleSearchChange = useCallback(value => {
        setSearchInput(value)
        setPage(1)
    }, [])

    const handleStatusChange = useCallback(value => {
        setStatusFilter(value)
        setPage(1)
    }, [])

    const handlePriorityChange = useCallback(value => {
        setPriorityFilter(value)
        setPage(1)
    }, [])

    const handleSortByChange = useCallback(value => {
        setSortBy(value)
        setPage(1)
    }, [])

    const handleOrderToggle = useCallback(() => {
        setOrder(prev => (prev === "asc" ? "desc" : "asc"))
        setPage(1)
    }, [])

    const handleResetFilters = useCallback(() => {
        setSearchInput("")
        setStatusFilter("ALL")
        setPriorityFilter("ALL")
        setSortBy("dueDate")
        setOrder("asc")
        setPage(1)
    }, [])

    const hasActiveFilters = useMemo(() => {
        return (
            Boolean(searchInput.trim()) ||
            statusFilter !== "ALL" ||
            priorityFilter !== "ALL" ||
            sortBy !== "dueDate" ||
            order !== "asc"
        )
    }, [searchInput, statusFilter, priorityFilter, sortBy, order])

    const handleCreateSubmit = useCallback(
        values => {
            createTask(values)
        },
        [createTask]
    )

    const handleEditTaskSubmit = useCallback(
        values => {
            if (editingTask?._id) {
                updateTask({ id: editingTask._id, data: values })
            }
        },
        [editingTask, updateTask]
    )

    const handleInlineStatusChange = useCallback(
        (id, status) => {
            updateStatus({ id, status })
        },
        [updateStatus]
    )

    const handleDeleteConfirm = useCallback(() => {
        if (deletingTask?._id) {
            deleteTask(deletingTask._id)
        }
    }, [deletingTask, deleteTask])

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Tasks
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Manage, filter, and track.
                        </p>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Button
                            size="sm"
                            onClick={() => handleCreateModalOpenChange(true)}
                            className="gap-1.5 shadow-xs"
                        >
                            <Plus className="size-4" />
                            <span>Create Task</span>
                        </Button>
                    </div>
                </div>
                <TaskFilters
                    search={searchInput}
                    onSearchChange={handleSearchChange}
                    status={statusFilter}
                    onStatusChange={handleStatusChange}
                    priority={priorityFilter}
                    onPriorityChange={handlePriorityChange}
                    sortBy={sortBy}
                    onSortByChange={handleSortByChange}
                    order={order}
                    onOrderToggle={handleOrderToggle}
                    onReset={handleResetFilters}
                    hasActiveFilters={hasActiveFilters}
                />
                {isLoading ? (
                    "Loading Tasks..."
                ) : tasks.length === 0 ? (
                    <TaskEmptyState
                        hasActiveFilters={hasActiveFilters}
                        onCreateTask={() => handleCreateModalOpenChange(true)}
                    />
                ) : (
                    <div className="space-y-4">
                        <TaskTable
                            tasks={tasks}
                            onView={task => setViewingTask(task)}
                            onEdit={task => setEditingTask(task)}
                            onDelete={task => setDeletingTask(task)}
                            onStatusChange={handleInlineStatusChange}
                        />
                        <TaskPagination
                            currentPage={pagination.page}
                            totalPages={pagination.totalPages}
                            totalCount={pagination.total}
                            limit={limit}
                            onPageChange={setPage}
                            onLimitChange={newLimit => {
                                setLimit(newLimit)
                                setPage(1)
                            }}
                        />
                    </div>
                )}
                <TaskModal
                    open={isCreateModalOpen}
                    onOpenChange={handleCreateModalOpenChange}
                    onSubmit={handleCreateSubmit}
                    isSubmitting={isCreating}
                />
                <TaskModal
                    open={Boolean(editingTask)}
                    onOpenChange={open => !open && setEditingTask(null)}
                    task={editingTask}
                    onSubmit={handleEditTaskSubmit}
                    isSubmitting={isUpdating}
                />
                <TaskDetailsModal
                    open={Boolean(viewingTask)}
                    onOpenChange={open => !open && setViewingTask(null)}
                    task={viewingTask}
                />
                <TaskDeleteDialog
                    open={Boolean(deletingTask)}
                    onOpenChange={open => !open && setDeletingTask(null)}
                    task={deletingTask}
                    onConfirm={handleDeleteConfirm}
                    isDeleting={isDeleting}
                />
            </div>
        </div>
    )
}
