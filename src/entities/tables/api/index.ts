import clientApi from 'shared/api/base-api'
import { apiKeys } from 'shared/constants/api-keys'
import { ITable } from '../model/types'
import { ServerResponseType } from 'shared/types/response-data'

export const getTablesApi = async (): ServerResponseType<ITable[]> => {
  const response = await clientApi.get(apiKeys.getTables)
  return response.data
}

export const getTableByIdApi = async (
  id: string
): ServerResponseType<ITable> => {
  const response = await clientApi.get(`${apiKeys.getTable}/${id}`)
  return response.data
}

export const deleteTableApi = async (id: number): ServerResponseType<void> => {
  const response = await clientApi.delete(`${apiKeys.deleteTable}/${id}`)
  return response.data
}

export const createTableApi = async (
  data: Omit<ITable, 'id'>
): ServerResponseType<ITable> => {
  const response = await clientApi.post(apiKeys.createTable, { ...data })
  return response.data
}

export const updateTableApi = async ({
  id,
  data,
  market
}: ITable): ServerResponseType<ITable> => {
  const response = await clientApi.patch(`${apiKeys.updateTable}/${id}`, {
    data,
    market
  })
  return response.data
}
