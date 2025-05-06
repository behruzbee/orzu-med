import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { apiKeys } from 'shared/constants/api-keys'

import {
  getUserApi,
  getUsersApi,
  createUserApi,
  deleteUserApi,
  updateUserApi
} from '.'
import { notifications } from '@mantine/notifications'
import { IUser } from '../model/types'

export const useGetUser = (id: number) => {
  return useQuery({
    queryKey: [apiKeys.getUser],
    queryFn: () => getUserApi(id)
  })
}

export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: [apiKeys.getUsers],
    queryFn: () => getUsersApi(),
    select: (data) => data.data
  })
}

export const useDeleteUserQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteUserApi(id),
    mutationKey: [apiKeys.deleteUser],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.getMarket]
      })
      queryClient.invalidateQueries({
        queryKey: [apiKeys.getUsers]
      })
      notifications.show({
        title: 'Успешно',
        message: 'Пользователь успешно удален'
      })
    }
  })
}

export const useCreateUserQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<IUser, 'id'>) => createUserApi(data),
    mutationKey: [apiKeys.createUser, apiKeys.me],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.getUser]
      })
      notifications.show({
        title: 'Успешно',
        message: 'Рынок успешно создан',
        color: 'green'
      })
    },
    onError: (error) => {
      notifications.show({
        title: 'Предупреждение',
        // @ts-ignore
        message: error.response.data.message,
        color: 'yellow'
      })
    }
  })
}

export const useUpdateUserQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: IUser) => updateUserApi(data),
    mutationKey: [apiKeys.updateUser, apiKeys.me],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.getMarket]
      })
      notifications.show({
        title: 'Успешно',
        message: 'Рынок успешно сохранен',
        color: 'green'
      })
    },
    onError: (error) => {
      notifications.show({
        title: 'Ошибка',
        // @ts-ignore
        message: error.response.data.message,
        color: 'red'
      })
    }
  })
}
