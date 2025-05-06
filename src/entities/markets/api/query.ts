import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import { apiKeys } from 'shared/constants/api-keys'

import {
  createMarketApi,
  deleteMarketApi,
  getMarketByIdApi,
  getMarketsApi
} from '.'
import { IMarket } from '../model/types'
import { notifications } from '@mantine/notifications'

export const useCreateMarketQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<IMarket, 'id'>) => createMarketApi(data),
    mutationKey: [apiKeys.createMarket, apiKeys.me],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.getMarkets],
        exact: true
      })
      notifications.show({
        title: 'Успешно',
        message: 'Рынок успешно создан',
        color: 'green'
      })
    }
  })
}
export const useGetMarketsQuery = () => {
  return useQuery({
    queryKey: [apiKeys.getMarkets],
    queryFn: () => getMarketsApi(),
    select: (data) => data.data
  })
}

export const useGetMarketQuery = (id: string) => {
  return useQuery({
    queryKey: [apiKeys.getMarket, id],
    queryFn: () => getMarketByIdApi(id),
    select: (data) => data.data
  })
}

export const useDeleteMarketMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteMarketApi(id),
    mutationKey: [apiKeys.deleteMarket],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.getMarkets],
        exact: true
      })
      notifications.show({
        title: 'Успешно',
        message: 'Рынок успешно удален'
      })
    }
  })
}
