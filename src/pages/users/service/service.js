import api from "@/api/api"

export const getAllUsersService = async () => {
    const response = await api.get("/auth")
    return response.data
}
