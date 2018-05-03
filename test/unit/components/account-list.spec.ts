import { AccountList, AccountListProps } from '../../../src/components/account-list'
import { sampleAccounts } from '../../fixtures/accounts'
import { getChild, getContents } from '../../helpers/element'

describe('AccountList component', () => {
  let el: JSX.Element

  beforeEach(() => {
    el = AccountList({ accounts: sampleAccounts })
  })

  it('should return a <ul>', () => {
    expect(el.type).toBe('ul')
  })

  it('should list the account names', () => {
    sampleAccounts.forEach((sampleAccount, i) => {
      const child = getChild(el, i)
      expect(child.type).toBe('li')
      expect(getContents(child)).toEqual(sampleAccount.name)
    })
  })
})
