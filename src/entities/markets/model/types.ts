import { ITable } from "entities/tables"

export interface IMarket {
  id: number
  name: string
  description?: string
  tables?: ITable[]
}
