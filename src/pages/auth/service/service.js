import api from "../../../api/api"

export const loginServie = async data => {
    const result = await api.post("/auth/login", data)
    return result.data
}

export const registerServie = async data => {
    const result = await api.post("/auth/register", data)
    return result.data
}

export const logoutServie = async () => {
    const response = await api.post("/auth/logout")
    return response.data
}

export const getCurrentUserService = async () => {
    const response = await api.get("/auth/user")
    return response.data
}
