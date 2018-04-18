import * as React from 'react'
import { EventType } from '../event'

// I have no idea why TS doesn't allow CustomEvents in event listeners...
interface EventListener {
  (evt: CustomEvent): void
}

interface FileUploadProps {}

export const FileUpload = (props: React.Props<FileUploadProps>): JSX.Element => {
  function fireUploadEvent(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        e.target.dispatchEvent(new CustomEvent(EventType.FileUpload, {
          bubbles: true,
          detail: e.target.files[i]
        }))
      }
    }
    e.target.value = '' // reset
  }

  return <input type="file" multiple accept=".qif, .csv, .xlsx" onChange={fireUploadEvent} />
}

export const handleFileUpload: EventListener = (e: CustomEvent) => {
  e.stopPropagation()
  console.log('handling FileUpload event', e.detail)
}
