import { jwtDecode } from "jwt-decode"

export const isTokenValid = (token?: string | null) => {
    if (!token) return false

    try {
        const decodedToken = jwtDecode(token)

        if (!decodedToken || !decodedToken.exp) {
            return false
        }

        const currentTimeInSeconds = Date.now() / 1000

        return decodedToken.exp > currentTimeInSeconds
    } catch (error) {
        return false
    }
}