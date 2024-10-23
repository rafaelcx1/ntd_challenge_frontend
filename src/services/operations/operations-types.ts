export type OperationResponse = {
    id: number
    creationDate: Date
    type: string
    cost: number
}

export type Result<T> = {
    result: T
}

export type AddRequest = {
    value1: number
    value2: number
}

export type SubtractRequest = {
    value1: number
    value2: number
}

export type MultiplyRequest = {
    value1: number
    value2: number
}

export type DivisionRequest = {
    value1: number
    value2: number
}

export type SquareRootRequest = {
    value: number
}

export type RandomStringRequest = {
    size: number
}