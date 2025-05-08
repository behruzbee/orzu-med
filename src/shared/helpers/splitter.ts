// @ts-ignore
export function collectGroupedByWeek(markets) {
  const result = []
  const numMarkets = markets.length
  const numTables = markets[0].length

  for (let tableIndex = 0; tableIndex < numTables; tableIndex++) {
    const numRows = markets[0][tableIndex].length
    const numWeeks = markets[0][tableIndex][0].length - 2 // минус первые 2 колонки

    for (let weekIndex = 0; weekIndex < numWeeks; weekIndex++) {
      const weekData = []

      for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        const row = []

        const code = markets[0][tableIndex][rowIndex][0]
        const name = markets[0][tableIndex][rowIndex][1]
        row.push(code, name)

        for (let marketIndex = 0; marketIndex < numMarkets; marketIndex++) {
          const marketTable = markets[marketIndex][tableIndex]
          const value = marketTable[rowIndex][weekIndex + 2] ?? null
          row.push(value)
        }

        weekData.push(row)
      }

      result.push(weekData)
    }
  }

  return result
}
