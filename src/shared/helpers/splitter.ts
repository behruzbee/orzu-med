/* @ts-ignore */
export function collectGroupedByWeek(markets) {
  const result = []

  const numMarkets = markets.length
  const numRows = markets[0][0].length
  const numWeeks = markets[0][0][0].length - 2

  for (let weekIndex = 0; weekIndex < numWeeks; weekIndex++) {
    const weekData = []

    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      const row = []

      const code = markets[0][0][rowIndex][0]
      const name = markets[0][0][rowIndex][1]
      row.push(code, name)

      for (let marketIndex = 0; marketIndex < numMarkets; marketIndex++) {
        const value = markets[marketIndex][0][rowIndex][weekIndex + 2]
        row.push(value)
      }

      weekData.push(row)
    }

    result.push(weekData)
  }

  console.log(result);
  return result
}

export function bb12(tables: number[][][], week: number) {
  const result = []

  if (tables) {
    for (let i = 0; i < 27; i++) {
      const table = tables[i]
      if (table) {
        const res = table[week - 1]
        result.push(res)
      }
    }
  }

  return result
}
