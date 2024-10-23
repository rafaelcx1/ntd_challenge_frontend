import { api } from "../api"
import { AuthRequest, AuthResponse } from "./auth-types"

const baseUrl = "/auth"

export const authenticate = async (auth: AuthRequest): Promise<AuthResponse> => {
    const response = await api.post(baseUrl, auth)
    return response.data
}