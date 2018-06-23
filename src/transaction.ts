export enum TransactionStatus {
  Cleared = 'c',
  Reconciled = 'R'
}

export interface TransactionCategory {
  category: string
  amount: number
}

export interface Transaction {
  id: string
  date: Date
  account: string
  payee: string
  memo: string
  categories: TransactionCategory[]
  status: TransactionStatus
  amount: number
}
