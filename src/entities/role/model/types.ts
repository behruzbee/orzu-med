import { IPermission } from "entities/permissions"

export interface IRole {
  id: number
  name: string
  description?: string
  deletedAt: string | null
  permissions: IPermission[]
  permissionsMarket?: string;
}
