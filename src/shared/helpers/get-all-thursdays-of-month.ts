function getAllThursdaysOfMonth(year: number, month: number): string[] {
  const thursdays: string[] = []
  const date = new Date(year, month, 1)

  while (date.getMonth() === month) {
    if (date.getDay() === 3) {
      thursdays.push(
        date.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      )
    }
    date.setDate(date.getDate() + 1)
  }

  return thursdays
}

export { getAllThursdaysOfMonth }
