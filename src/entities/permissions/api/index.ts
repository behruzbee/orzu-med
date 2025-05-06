import clientApi from 'shared/api/base-api'
import { apiKeys } from 'shared/constants/api-keys'
import { IPermission } from '../model/types'
import { ServerResponseType } from 'shared/types/response-data'

export const getPermissionsApi = async (): ServerResponseType<IPermission[]> => {
  const response = await clientApi.get(apiKeys.getPermissions)
  return response.data
}

export const getPermissionByIdApi = async (id: string): ServerResponseType<IPermission> => {
  const response = await clientApi.get(`${apiKeys.getPermission}/${id}`)
  return response.data
}