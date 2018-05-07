import * as React from 'react'
import { Account } from '../account'
import { Transaction } from '../transaction'
import { AccountList } from './account-list'
import { FileUpload } from './file-upload'
import { IncomeVsSpendingChart } from './income-vs-spending-chart'

export interface AppComponentProps {
  accounts: Account[]
  transactions: Transaction[]
}

export const AppComponent = (props: AppComponentProps): JSX.Element => {
  const el = <main>
    <h1>VizFin</h1>
    <AccountList accounts={props.accounts} />
    <FileUpload />
    <IncomeVsSpendingChart transactions={props.transactions} />
  </main>

  return el
}
