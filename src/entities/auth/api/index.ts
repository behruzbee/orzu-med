import clientApi from 'shared/api/base-api'
import { apiKeys } from 'shared/constants/api-keys'

import { ILoginType, IMe } from './types'

export const getMeApi = async (): Promise<IMe> => {
  const response = await clientApi.get(apiKeys.me)
  sessionStorage.setItem('me', JSON.stringify(response.data))
  return response.data
}

export const loginApi = async (
  data: ILoginType
): Promise<{ access_token: string }> => {
  const response = await clientApi.post(apiKeys.login, { ...data })
  return response.data
}
