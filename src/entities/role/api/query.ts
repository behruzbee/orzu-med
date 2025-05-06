import { useMutation } from '@tanstack/react-query'

import { apiKeys } from 'shared/constants/api-keys'

import { createRoleApi } from '.'
import { IRole } from '../model/types'
import { notifications } from '@mantine/notifications'

export const useCreateRoleQuery = () => {
  return useMutation({
    mutationFn: (
      data: Omit<IRole, 'id' | 'description' | 'deletedAt' | 'permissions'>
    ) => createRoleApi(data),
    mutationKey: [apiKeys.createRole, apiKeys.me],
    onSuccess: () => {
      notifications.show({
        title: 'Успешно',
        message: 'Роль успешно создана'
      })
    }
  })
}
