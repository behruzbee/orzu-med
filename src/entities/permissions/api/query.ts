import { useQuery } from '@tanstack/react-query'

import { apiKeys } from 'shared/constants/api-keys'

import { getPermissionByIdApi, getPermissionsApi } from '.'

export const useGetPermissionsQuery = () => {
  return useQuery({
    queryKey: [apiKeys.getPermissions],
    queryFn: () => getPermissionsApi(),
    select: (data) => data
  })
}

export const useGetPermissionQuery = (id: string) => {
  return useQuery({
    queryKey: [apiKeys.getPermission, id],
    queryFn: () => getPermissionByIdApi(id),
    select: (data) => data.data
  })
}
