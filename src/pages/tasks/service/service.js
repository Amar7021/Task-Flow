import api from "@/api/api"

export const getTasksService = async params => {
    const response = await api.get("/tasks", { params })
    return response.data
}

export const getTaskByIdService = async id => {
    const response = await api.get(`/tasks/${id}`)
    return response.data
}

export const createTaskService = async data => {
    const response = await api.post("/tasks", data)
    return response.data
}

export const updateTaskService = async ({ id, data }) => {
    const response = await api.put(`/tasks/${id}`, data)
    return response.data
}

export const updateTaskStatusService = async ({ id, status }) => {
    const response = await api.patch(`/tasks/${id}/status`, { status })
    return response.data
}

export const deleteTaskService = async id => {
    const response = await api.delete(`/tasks/${id}`)
    return response.data
}
