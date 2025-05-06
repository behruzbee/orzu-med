import { IMarket } from "entities/markets"

export interface ITable {
  id: number
  data: any
  market: IMarket
}
