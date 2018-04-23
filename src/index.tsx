import { unionBy } from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Account } from './account'
import { EventType } from './event'
import { Transaction } from './transaction'
import { handleFileUpload } from './components/file-upload'
import { MainComponent } from './components/main'

// App stores.
let accounts: Account[] = []
let transactions: Transaction[] = []

const getAccounts = (transactions: Transaction[]) => {
  const accountNames = transactions.map(transaction => transaction.account)
  const uniqueAccounts = new Set(accountNames)
  return Array.from(uniqueAccounts).map(name => ({ name }))
}

const render = () => {
  ReactDOM.render(
    <MainComponent accounts={accounts} />,
    document.getElementById('app')
  )
}

// I can't figure out how to make TypeScript treat the 2nd argument as EventListener and not EventListenerObject.
window.addEventListener(EventType.FileUpload, {
  handleEvent: (e: CustomEvent) => {
    handleFileUpload(e).then(newTransactions => {
      transactions = unionBy(transactions, newTransactions, 'id')
      console.log(transactions.length, 'transactions')
      accounts = getAccounts(transactions)
      render()
    })
  }
})

render()
