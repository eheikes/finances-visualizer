import { Options, AxisOptions, IndividualSeriesOptions } from 'highcharts'
import { buildDataSet, IncomeVsSpendingChart } from '../../../src/components/income-vs-spending-chart'
import { sampleTransactions } from '../../fixtures/transactions'
import { getContents } from '../../helpers/element'

describe('buildDataSet()', () => {
  it('should return an empty data set if there are no transactions', () => {
    expect(buildDataSet([])).toEqual({})
  })

  it('should build a data set that spans the entire date range', () => {
    const keys = Object.keys(buildDataSet(sampleTransactions))
    expect(keys[0]).toBe('Mar 2015')
    expect(keys[keys.length - 1]).toBe('Mar 2018')
  })

  it('should build a data set that totals the amounts for each month', () => {
    const keys = Object.values(buildDataSet(sampleTransactions))
    expect(keys[0]).toBe(sampleTransactions[0].amount + sampleTransactions[1].amount) // March 2015
    expect(keys[keys.length - 1]).toBe(sampleTransactions[2].amount) // March 2018
  })
})

describe('IncomeVsSpendingChart component', () => {
  let el: JSX.Element

  describe('when there are no transactions', () => {
    beforeEach(() => {
      el = IncomeVsSpendingChart({ transactions: [] })
    })

    it('should return a <div> with a "no data" message', () => {
      expect(el.type).toBe('div')
      expect(getContents(el)).toContain('Nothing to show')
    })
  })

  describe('when there are transactions', () => {
    let config: Options
    let xAxis: AxisOptions
    let series: IndividualSeriesOptions[]

    beforeEach(() => {
      el = IncomeVsSpendingChart({ transactions: sampleTransactions })
      config = el.props.config
      xAxis = config.xAxis as AxisOptions
      series = config.series as IndividualSeriesOptions[]
    })

    it('should set the chart title', () => {
      expect(config.title!.text).toEqual(jasmine.any(String))
    })

    it('should set the X-axis labels', () => {
      expect(xAxis.categories).toEqual(jasmine.any(Array))
      expect(xAxis.categories!.every((category: string) => {
        return /^[A-Z][a-z]{2} \d{4}$/.test(category)
      })).toBe(true)
    })

    it('should set the data series', () => {
      expect(series[0].data).toEqual(jasmine.any(Array))
      const dataPoints = series[0].data as number[]
      expect(dataPoints.every((dataPoint) => {
        return typeof dataPoint === 'number'
      })).toBe(true)
    })

    it('should match the labels count and the data length', () => {
      expect(series[0].data!.length).toBe(xAxis.categories!.length)
    })

    it('should restrict the data to 12 months', () => {
      expect(xAxis.categories!.length).toBeLessThanOrEqual(12)
      expect(series[0].data!.length).toBeLessThanOrEqual(12)
    })
  })
})
