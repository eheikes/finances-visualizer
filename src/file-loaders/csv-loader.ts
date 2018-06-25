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

interface TransactionContinuation {
  id: string
  category: string
  amount: number
}

type Row = string[]

const continuationId = 'CONTINUATION'
const separator = '||'

const isRecord = (row: Row) =>
  (row[ColumnName.Date] !== '' && row[ColumnName.Account] !== '') ||
  row[ColumnName.Category] !== ''

const buildId = (row: Row): string => sha1([
  row[ColumnName.Date],
  row[ColumnName.Account],
  row[ColumnName.Memo],
  row[ColumnName.Amount]
].join(separator)) as string

const combineContinuations = (soFar: Transaction[], val: Transaction | TransactionContinuation): Transaction[] => {
  // If a continuation, add it to the previous record.
  // Otherwise just push it back into the array.
  if (val.id === continuationId) {
    const continuation = val as TransactionContinuation
    const prevRecord = soFar[soFar.length - 1]
    if (soFar.length > 0) {
      prevRecord.categories.push({
        category: continuation.category,
        amount: continuation.amount
      })
      prevRecord.amount += continuation.amount
    }
  } else {
    soFar.push(val as Transaction)
  }
  return soFar
}

const convertToTransaction = (row: Row): Transaction | TransactionContinuation => {
  if (row[ColumnName.Date] === '') { // is a continuation (split transaction)
    return {
      id: continuationId,
      category: row[ColumnName.Category],
      amount: parseFloat(row[ColumnName.Amount])
    }
  }
  return {
    id: buildId(row),
    date: new Date(row[ColumnName.Date]),
    account: row[ColumnName.Account],
    payee: row[ColumnName.Payee],
    memo: row[ColumnName.Memo],
    categories: [{
      category: row[ColumnName.Category],
      amount: parseFloat(row[ColumnName.Amount])
    }],
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
    .slice(1) // ignore header row
    .map(convertToTransaction)
    .reduce(combineContinuations, [])
}
