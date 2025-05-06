import { useMutation, useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { apiKeys } from 'shared/constants/api-keys'
import { ServerErrorType } from 'shared/types/response-data'

import { getMeApi, loginApi } from '.'
import { ILoginType } from './types'
import { TOKEN } from 'shared/constants/env'
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'
import { AppPages } from 'shared/constants/routes'

export const useGetMeQuery = () => {
  return useQuery({
    queryKey: [apiKeys.me],
    queryFn: getMeApi
  })
}

export const useLoginQuery = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (data: ILoginType) => loginApi(data),
    mutationKey: [apiKeys.login],
    onSuccess: (data) => {
      const access_token = data.access_token
      if (access_token) {
        Cookies.set(TOKEN.AUTH_TOKEN, access_token)
        notifications.show({
          title: 'Успешно',
          message: 'Вы успешно вошли в систему',
          color: 'green'
        })
      }
      navigate(AppPages.RootPage)
    },
    onError: (data: ServerErrorType) => {
      data.message &&
        notifications.show({
          title: 'Логин или пароль не правилный',
          message: data.message
        })
    }
  })
}
