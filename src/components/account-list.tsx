import * as React from 'react'
import { Account } from '../account'

interface AccountListProps {
  accounts: Account[]
}

export const AccountList = (props: AccountListProps): JSX.Element => {
  const accountList = props.accounts.map(account => <li key={account.name}>{account.name}</li>)
  return <ul>{accountList}</ul>
}
