export const convertToChartData = (
  rows: any[][],
  dateHeaders: string[],
  days: string[]
) => {
  const result = days.map((day, idx) => {
    const res = {}

    // @ts-ignore
    res.date = day

    dateHeaders.forEach((header) => {
      const result = rows.reduce((acc, row) => {
        const res = row.reduce((acc, curr, resIdx) => {
                if(resIdx > 1 && resIdx < resIdx + idx ) {
                        return acc + curr
                }
                return acc
        }, 0)
        return acc + res
      }, 0)

      console.log(result)
      //       res[header] =
    })
  })

  console.log(rows)

  return result
}
