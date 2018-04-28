import * as React from 'react'
import { EventType } from '../event'

interface FileUploadProps {}

export const FileUpload = (props: FileUploadProps): JSX.Element => {
  const fireUploadEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return <input type='file' multiple accept='.qif, .csv, .xlsx' onChange={fireUploadEvent} />
}
