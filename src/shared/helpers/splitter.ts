// @ts-ignore
export function collectGroupedByWeek(markets) {
  const result = []
  const numMarkets = markets.length
  const numTables = markets[0].length

  for (let tableIndex = 0; tableIndex < numTables; tableIndex++) {
    const numRows = markets[0][tableIndex].length
    const numWeeks = markets[0][tableIndex][0].length - 2 // первые 2 — code и name

    for (let weekIndex = 0; weekIndex < numWeeks; weekIndex++) {
      const weekData = []

      for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        const row = []

        const code = markets[0][tableIndex][rowIndex][0]
        const name = markets[0][tableIndex][rowIndex][1]
        row.push(code, name)

        const values = []

        for (let marketIndex = 0; marketIndex < numMarkets; marketIndex++) {
          const marketTable = markets[marketIndex][tableIndex]
          const value = marketTable[rowIndex][weekIndex + 2] ?? null
          values.push(value)
        }
        // Проверка: если хотя бы один market дал значение ≠ null, добавляем строку
        const hasAtLeastOneValue = values.some(
         (v) => v !== null && v !== 'null' && v !== '' && String(v).trim() !== ''
        )
        if (hasAtLeastOneValue) {
          row.push(...values)
          weekData.push(row)
        }
      }

      // Добавляем неделю только если в ней есть хотя бы одна строка
      if (weekData.length > 0) {
        result.push(weekData)
      }
    }
  }

  return result
}
