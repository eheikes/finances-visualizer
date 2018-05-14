import { handleFileUpload, render } from './app'
import { EventType } from './event'
import { log } from './logger'

window.addEventListener(EventType.FileUpload, handleFileUpload)
render().catch(err => {
  log.critical('Error when rendering:', err)
})
