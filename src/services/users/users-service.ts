import { api } from "../api"
import { User, UserRegisterRequest } from "./users-types"

const baseUrl = "/users"

export const register = async (data: UserRegisterRequest): Promise<User> => {
    const response = await api.post(`${baseUrl}/register`, data)
    return response.data
}

export const getUser = async (): Promise<User> => {
    const response = await api.get(baseUrl)
    return response.data
}