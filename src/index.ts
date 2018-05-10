import { handleFileUpload, render } from './app'
import { EventType } from './event'

window.addEventListener(EventType.FileUpload, handleFileUpload)
render().catch(err => {
  console.error('Error when rendering:', err)
})
