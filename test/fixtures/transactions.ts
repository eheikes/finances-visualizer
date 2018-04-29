import { Transaction, TransactionStatus } from '../../src/transaction'

export const sampleTransactions: Transaction[] = [{
  id: '1',
  date: new Date(2018, 2, 1),
  account: 'Checking',
  payee: 'Fast Food Co.',
  memo: 'FAST FOOD CO',
  categories: ['Restaurants:Fast Food'],
  status: TransactionStatus.Cleared,
  amount: 7.85
}, {
  id: '2',
  date: new Date(2018, 2, 2),
  account: 'Checking',
  payee: 'Clothing Store',
  memo: 'CLOTHING STORE',
  categories: ['Shopping:Clothes'],
  status: TransactionStatus.Reconciled,
  amount: 112.04
}]