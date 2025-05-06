import clientApi from 'shared/api/base-api'
import { apiKeys } from 'shared/constants/api-keys'
import { IMarket } from '../model/types'
import { ServerResponseType } from 'shared/types/response-data'

export const getMarketsApi = async (): ServerResponseType<IMarket[]> => {
  const response = await clientApi.get(apiKeys.getMarkets)
  return response.data
}

export const getMarketByIdApi = async (id: string): ServerResponseType<IMarket> => {
  const response = await clientApi.get(`${apiKeys.getMarket}/${id}`)
  return response.data
}


export const deleteMarketApi = async (id: number): ServerResponseType<void> => {
  const response = await clientApi.delete(`${apiKeys.deleteMarket}/${id}`)
  return response.data
}

export const createMarketApi = async (
  data: Omit<IMarket, 'id'>
): ServerResponseType<IMarket> => {
  const response = await clientApi.post(apiKeys.createMarket, { ...data })
  return response.data
}
