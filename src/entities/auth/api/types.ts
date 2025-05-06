import { IRole } from 'entities/role/model/types'

export interface IMe {
  id: number
  login: string
  password: string
  deletedAt: string | null
  role: IRole
}

export interface ILoginType {
  login: string
  password: string
}
