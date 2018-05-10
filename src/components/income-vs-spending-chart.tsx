import * as React from 'react'
import { Options } from 'highcharts'
import * as ReactHighcharts from 'react-highcharts'
import { getShortMonthName } from '../date'
import { Transaction } from '../transaction'

export interface IncomeVsSpendingChartProps {
  transactions: Transaction[]
}

interface DataSet {
  [label: string]: number
}

const maxNumMonths = 12

const getDateLabel = (date: Date): string => `${getShortMonthName(date.getMonth())} ${date.getFullYear()}`

// Build a data object with the date range of months for the given transactions.
export const buildDataSet = (transactions: Transaction[]): DataSet => {
  // If no transactions, return an empty object.
  if (transactions.length === 0) { return {} }

  // Define the date range.
  const first = transactions[0].date
  const last = transactions[transactions.length - 1].date

  // Initialize the data for the date range.
  let data: DataSet = {}
  for (
    let currentDate: Date = new Date(first.getFullYear(), first.getMonth(), first.getDate(), 12, 0, 0);
    currentDate.getTime() < (new Date(last.getFullYear(), last.getMonth() + 1, 1, 0, 0, 0)).getTime();
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1, 12, 0, 0)
  ) {
    const thisDate = new Date(currentDate)
    data[getDateLabel(thisDate)] = 0
  }

  // Calculate the data.
  transactions.forEach(transaction => {
    const label = getDateLabel(transaction.date)
    data[label] += transaction.amount
  })

  return data
}

export const IncomeVsSpendingChart = (props: IncomeVsSpendingChartProps): JSX.Element => {
  if (props.transactions.length === 0) {
    return <div>Nothing to show, please upload a file</div>
  }
  const dataSet: DataSet = buildDataSet(props.transactions)
  const dateLabels = Object.keys(dataSet).slice(0, maxNumMonths)
  const dataValues = Object.values(dataSet).slice(0, maxNumMonths)
  const config: Options = {
    title: {
      text: 'Income vs Spending'
    },
    xAxis: {
      categories: dateLabels
    },
    series: [{
      data: dataValues
    }]
  }
  return <ReactHighcharts config={config}></ReactHighcharts>
}
