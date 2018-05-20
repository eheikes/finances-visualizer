import { unionBy } from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Account } from './account'
import { readFile } from './file'
import { log } from './logger'
import { Transaction } from './transaction'
import { AppComponent } from './components/app'

// App stores.
let accounts: Account[] = []
let transactions: Transaction[] = []

const getAccounts = (transactions: Transaction[]) => {
  const accountNames = transactions.map(transaction => transaction.account)
  const uniqueAccounts = new Set(accountNames)
  return Array.from(uniqueAccounts).map(name => ({ name }))
}

export const render = (): Promise<void> => {
  return new Promise((resolve) => {
    ReactDOM.render(
      <AppComponent accounts={accounts} transactions={transactions} />,
      document.getElementById('app'),
      resolve
    )
  })
}

// Just a helper for testing.
export const reset = () => {
  accounts = []
  transactions = []
}

// I have no idea why TS doesn't allow CustomEvents in event listeners...
// tslint:disable-next-line:no-unused-variable
interface EventListener {
  (evt: CustomEvent): void
}

// I can't figure out how to make TypeScript treat the 2nd argument
//   to addEventListener() as EventListener and not EventListenerObject.
export const handleFileUpload = ({
  handleEvent: (e: CustomEvent): Promise<void> => {
    e.stopPropagation()
    return readFile(e.detail).then(newTransactions => {
      transactions = unionBy(transactions, newTransactions, 'id')
      log.info(`${transactions.length} transactions`)
      accounts = getAccounts(transactions)
      return render()
    }).catch(err => {
      log.error('Error reading file', err)
    })
  }
})
