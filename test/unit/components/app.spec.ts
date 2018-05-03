import { AppComponent, AppComponentProps } from '../../../src/components/app'
import { AccountList } from '../../../src/components/account-list';
import { FileUpload } from '../../../src/components/file-upload'
import { sampleAccounts } from '../../fixtures/accounts'
import { getChildrenTypes, findChild } from '../../helpers/element';

describe('App component', () => {
  let el: JSX.Element

  beforeEach(() => {
    el = AppComponent({ accounts: sampleAccounts })
  })

  it('should return a <main>', () => {
    expect(el.type).toBe('main')
  })

  it('should contain an AccountList component', () => {
    const list = findChild(el, AccountList)
    expect(list).not.toBe(null)
    expect(list!.props.accounts).toEqual(sampleAccounts)
  })

  it('should contain a FileUpload component', () => {
    expect(getChildrenTypes(el)).toContain(FileUpload)
  })
})
