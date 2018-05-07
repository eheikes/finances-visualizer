interface Months {
  [index: number]: string
}

const months: Months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
}

export const getMonthName = (index: number): string => months[index]
export const getShortMonthName = (index: number): string => getMonthName(index).slice(0, 3)
