import { Transaction, TransactionStatus } from '../../src/transaction'

export const sampleTransactions: Transaction[] = [{
  id: '1',
  date: new Date(2015, 2, 1),
  account: 'Checking',
  payee: 'Fast Food Co.',
  memo: 'FAST FOOD CO',
  categories: [{
    category: 'Restaurants:Fast Food',
    amount: 7.85
  }],
  status: TransactionStatus.Reconciled,
  amount: 7.85
}, {
  id: '2',
  date: new Date(2015, 2, 2),
  account: 'Checking',
  payee: 'Clothing Store',
  memo: 'CLOTHING STORE',
  categories: [{
    category: 'Shopping:Clothes',
    amount: 112.04
  }],
  status: TransactionStatus.Reconciled,
  amount: 112.04
}, {
  id: '3',
  date: new Date(2018, 2, 2),
  account: 'Checking',
  payee: 'Grocery Store',
  memo: 'GROCERY STORE',
  categories: [{
    category: 'Food:Groceries',
    amount: 80.08
  }],
  status: TransactionStatus.Cleared,
  amount: 80.08
}]
