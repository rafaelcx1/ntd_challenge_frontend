import { mapToQueryParam } from "../../utils/query-params.util"
import { api } from "../api"
import { AddRequest, DivisionRequest, MultiplyRequest, OperationResponse, RandomStringRequest, Result, SquareRootRequest, SubtractRequest } from "./operations-types"

const baseUrl = "/operations"

export const getAllOperations = async (): Promise<OperationResponse[]> => {
    const response = await api.get(`${baseUrl}`)
    return response.data
}

export const add = async (data: AddRequest): Promise<Result<number>> => {
    const params = mapToQueryParam(data);
    const response = await api.get(`${baseUrl}/add${params}`)
    return response.data
}

export const subtract = async (data: SubtractRequest): Promise<Result<number>> => {
    const params = mapToQueryParam(data);
    const response = await api.get(`${baseUrl}/subtract${params}`)
    return response.data
}

export const multiply = async (data: MultiplyRequest): Promise<Result<number>> => {
    const params = mapToQueryParam(data);
    const response = await api.get(`${baseUrl}/multiply${params}`)
    return response.data
}

export const divide = async (data: DivisionRequest): Promise<Result<number>> => {
    const params = mapToQueryParam(data);
    const response = await api.get(`${baseUrl}/division${params}`)
    return response.data
}

export const squareRoot = async (data: SquareRootRequest): Promise<Result<number>> => {
    const params = mapToQueryParam(data);
    const response = await api.get(`${baseUrl}/square-root${params}`)
    return response.data
}

export const randomString = async (data: RandomStringRequest): Promise<Result<string>> => {
    const params = mapToQueryParam(data);
    const response = await api.get(`${baseUrl}/random-string${params}`)
    return response.data
}