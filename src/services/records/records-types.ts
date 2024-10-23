export type PageRequest = {
    page: number
    size: number
    sort: string
}

export type Record = {
    id: number
    operationId: number
    userId: number
    amount: number
    userBalance: number
    operationResponse: string
    date: Date
}

export type PageResponse = {
    number: number
    size: number
    totalElements: number
    totalPages: number
}

export type RecordResponse = {
    content: Record[]
    page: PageResponse
}