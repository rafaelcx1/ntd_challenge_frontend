import { mapToQueryParam } from "../../utils/query-params.util"
import { api } from "../api"
import { PageRequest, RecordResponse } from "./records-types"

const baseUrl = "/records"

export const getRecords = async (filter: string, page: PageRequest): Promise<RecordResponse> => {
    const pageParams = mapToQueryParam(page);
    const response = await api.get(`${baseUrl}${pageParams}&filter=${filter}`)
    return response.data
}

export const getBalance = async (): Promise<number> => {
    const response = await api.get(`${baseUrl}/balance`)
    return response.data
}

export const deleteRecord = async (id: number): Promise<void> => {
    await api.delete(`${baseUrl}/${id}`)
}
