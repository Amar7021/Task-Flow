import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    getTasksService,
    getTaskByIdService,
    createTaskService,
    updateTaskService,
    updateTaskStatusService,
    deleteTaskService,
} from "./service"
import { toast } from "sonner"

export const useTasks = params => {
    return useQuery({
        queryKey: ["tasks", params],
        queryFn: () => getTasksService(params),
        placeholderData: previousData => previousData,
    })
}

export const useTask = id => {
    return useQuery({
        queryKey: ["task", id],
        queryFn: () => getTaskByIdService(id),
        enabled: Boolean(id),
    })
}

export const useCreateTask = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createTaskService,
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] })
            toast.success(data?.message || "Task created successfully")
            options.onSuccess?.(data)
        },
        onError: error => {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to create task"
            toast.error(message)
            options.onError?.(error)
        },
    })
}

export const useUpdateTask = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateTaskService,
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            queryClient.invalidateQueries({ queryKey: ["task"] })
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] })
            toast.success(data?.message || "Task updated successfully")
            options.onSuccess?.(data)
        },
        onError: error => {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to update task"
            toast.error(message)
            options.onError?.(error)
        },
    })
}

export const useUpdateTaskStatus = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateTaskStatusService,
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            queryClient.invalidateQueries({ queryKey: ["task"] })
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] })
            toast.success(data?.message || "Status updated")
            options.onSuccess?.(data)
        },
        onError: error => {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to update status"
            toast.error(message)
            options.onError?.(error)
        },
    })
}

export const useDeleteTask = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteTaskService,
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] })
            toast.success(data?.message || "Task deleted successfully")
            options.onSuccess?.(data)
        },
        onError: error => {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to delete task"
            toast.error(message)
            options.onError?.(error)
        },
    })
}
