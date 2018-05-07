import { getMonthName, getShortMonthName } from '../../src/date'

describe('getMonthName()', () => {
  it('should return the 0-based name of the month', () => {
    expect(getMonthName(0)).toBe('January')
    expect(getMonthName(1)).toBe('February')
    expect(getMonthName(2)).toBe('March')
    expect(getMonthName(3)).toBe('April')
    expect(getMonthName(4)).toBe('May')
    expect(getMonthName(5)).toBe('June')
    expect(getMonthName(6)).toBe('July')
    expect(getMonthName(7)).toBe('August')
    expect(getMonthName(8)).toBe('September')
    expect(getMonthName(9)).toBe('October')
    expect(getMonthName(10)).toBe('November')
    expect(getMonthName(11)).toBe('December')
  })
})

describe('getShortMonthName()', () => {
  it('should return the 3-letter name of the month', () => {
    expect(getShortMonthName(0)).toBe('Jan')
    expect(getShortMonthName(1)).toBe('Feb')
    expect(getShortMonthName(2)).toBe('Mar')
    expect(getShortMonthName(3)).toBe('Apr')
    expect(getShortMonthName(4)).toBe('May')
    expect(getShortMonthName(5)).toBe('Jun')
    expect(getShortMonthName(6)).toBe('Jul')
    expect(getShortMonthName(7)).toBe('Aug')
    expect(getShortMonthName(8)).toBe('Sep')
    expect(getShortMonthName(9)).toBe('Oct')
    expect(getShortMonthName(10)).toBe('Nov')
    expect(getShortMonthName(11)).toBe('Dec')
  })
})
