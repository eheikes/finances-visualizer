import * as parse from 'csv-parse'
import * as promisify from 'pify'
import sha1 = require('sha1')
import { Transaction, TransactionStatus } from '../transaction'

enum ColumnName {
  Date = 0,
  Account = 1,
  CheckNumber = 2,
  Payee = 3,
  Memo = 4,
  Category = 5,
  Tag = 6,
  Status = 7,
  Amount = 8
}

type Row = string[]

const separator = '||'

const isNotOpeningBalance = (row: Row) => row[ColumnName.Payee] !== 'Opening Balance'
const isRecord = (row: Row) => row[ColumnName.Date] !== '' && row[ColumnName.Account] !== ''

const buildId = (row: Row): string => sha1([
  row[ColumnName.Date],
  row[ColumnName.Account],
  row[ColumnName.Memo],
  row[ColumnName.Amount]
].join(separator)) as string

const convertToTransaction = (row: Row): Transaction => {
  return {
    id: buildId(row),
    date: new Date(row[ColumnName.Date]),
    account: row[ColumnName.Account],
    payee: row[ColumnName.Payee],
    memo: row[ColumnName.Memo],
    categories: [row[ColumnName.Category]],
    status: row[ColumnName.Status] === TransactionStatus.Reconciled ?
      TransactionStatus.Reconciled :
      TransactionStatus.Cleared,
    amount: parseFloat(row[ColumnName.Amount])
  }
}

const removeFirstColumn = (row: Row) => row.slice(1)

export const loadCsv = async (csv: string): Promise<Transaction[]> => {
  const results: Row[] = await promisify(parse)(csv, {
    skip_empty_lines: true
  })
  return results
    .map(removeFirstColumn)
    .filter(isRecord)
    .filter(isNotOpeningBalance)
    .slice(1) // ignore header row
    .map(convertToTransaction)
}
