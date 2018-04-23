import * as React from 'react'
import { Account } from '../account'
import { AccountList } from './account-list'
import { FileUpload } from './file-upload'

interface MainComponentProps {
  accounts: Account[]
}

export const MainComponent = (props: MainComponentProps): JSX.Element => {
  const el = <main>
    <h1>VizFin</h1>
    <AccountList accounts={props.accounts} />
    <FileUpload />
  </main>

  return el
}
