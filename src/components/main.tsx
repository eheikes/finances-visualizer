import * as React from 'react'
import { EventType } from '../event'
import { AccountList } from './account-list'
import { FileUpload, handleFileUpload } from './file-upload'

// I can't figure out how to make TypeScript treat the 2nd argument as EventListener and not EventListenerObject.
window.addEventListener(EventType.FileUpload, {
  handleEvent: handleFileUpload
})

interface MainComponentProps {}

export const MainComponent = (props: React.Props<MainComponentProps>): JSX.Element => {
  const el = <main>
    <h1>VizFin</h1>
    <AccountList />
    <FileUpload />
  </main>

  return el
}
