export enum TransactionStatus {
  Cleared = 'c',
  Reconciled = 'R',
}

export interface Transaction {
  id: string
  date: Date
  account: string
  payee: string
  memo: string
  categories: string[]
  status: TransactionStatus
  amount: number
}
