/* @ts-ignore */
export function collectGroupedByPosition(markets) {
  const result = []

  const numStores = markets.length
  const numTables = markets[0].length

  for (let tableIndex = 0; tableIndex < numTables; tableIndex++) {
    const numRows = markets[0][tableIndex].length
    const numCols = markets[0][tableIndex][0].length - 2

    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      const rowGroup = []

      for (let colIndex = 0; colIndex < numCols; colIndex++) {
        const values = []

        for (let storeIndex = 0; storeIndex < numStores; storeIndex++) {
          const value = markets[storeIndex][tableIndex][rowIndex][colIndex + 2]
          values.push(value)
        }

        rowGroup.push(values)
      }

      result.push(rowGroup)
    }
  }

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
