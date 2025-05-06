import { IMe } from 'entities/auth'
import { Navigate } from 'react-router-dom'

export const сheckPermissions = (permission?: string) => {
  const me = JSON.parse(sessionStorage.getItem('me')!) as IMe

  if (!me) {
    <Navigate to="/login" />
  }

  const hasPermission =
    me.role.name === 'admin' ||
    JSON.parse(me.role.permissionsMarket || '').some(
      (item) => item === permission
    )

  return !!hasPermission
}
