export type UserRegisterRequest = {
    email: string,
    password: string
}

export type User = {
    email: string,
    status: "ACTIVE" | "INACTIVE"
}
