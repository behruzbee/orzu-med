import { useGetMarketQuery } from 'entities/markets'

const monthsRu = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
]

export const useDatePagination = (id: string): string[] => {
  const { data: market } = useGetMarketQuery(id)

  const dates: Set<string> = new Set()

  if (market?.tables?.length) {
    for (const table of market.tables) {
      const dateStr = table?.data?.date
      if (dateStr) {
        const date = new Date(dateStr)
        const monthName = `${monthsRu[date.getMonth()]}, ${date.getFullYear()}`
        dates.add(monthName)
      }
    }
  }

  return Array.from(dates)
}
