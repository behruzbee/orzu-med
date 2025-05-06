import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import { apiKeys } from 'shared/constants/api-keys'

import {
  createTableApi,
  deleteTableApi,
  getTableByIdApi,
  getTablesApi,
  updateTableApi
} from '.'
import { ITable } from '../model/types'
import { notifications } from '@mantine/notifications'

export const useCreateTableQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<ITable, 'id'>) => createTableApi(data),
    mutationKey: [apiKeys.createTable, apiKeys.me],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.getMarket]
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

export const useUpdateTableQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ITable) => updateTableApi(data),
    mutationKey: [apiKeys.updateTable, apiKeys.me],
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

export const useGetTablesQuery = () => {
  return useQuery({
    queryKey: [apiKeys.getTables],
    queryFn: () => getTablesApi(),
    select: (data) => data.data
  })
}

export const useGetTableQuery = (id: string) => {
  return useQuery({
    queryKey: [apiKeys.getTable, id],
    queryFn: () => getTableByIdApi(id),
    select: (data) => data.data
  })
}

export const useDeleteTableQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteTableApi(id),
    mutationKey: [apiKeys.deleteTable],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.getMarket]
      })
      notifications.show({
        title: 'Успешно',
        message: 'Рынок успешно удален'
      })
    }
  })
}
