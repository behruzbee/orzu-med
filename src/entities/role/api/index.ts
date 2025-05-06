import clientApi from 'shared/api/base-api'
import { apiKeys } from 'shared/constants/api-keys'
import { IRole } from '../model/types'
import { ServerResponseType } from 'shared/types/response-data'

export const createRoleApi = async (
  data: Omit<IRole, 'id' | 'description' | 'deletedAt' | 'permissions'>
): ServerResponseType<IRole> => {
  const response = await clientApi.post(apiKeys.createRole, data)
  return response.data
}
