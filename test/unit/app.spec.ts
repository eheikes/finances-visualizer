import { handleFileUpload, render, reset } from '../../src/app'
import { EventType } from '../../src/event'
import { accountName, sampleCsv } from '../fixtures/csv'

describe('app', () => {
  const containerId = 'app'
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    container.id = containerId
    document.body.appendChild(container)
    return render()
  })

  afterEach(() => {
    document.body.removeChild(container)
    reset()
  })

  describe('handleFileUpload()', () => {
    const { handleEvent } = handleFileUpload

    let oldContents: string
    let file: File
    let event: CustomEvent

    beforeEach(() => {
      oldContents = container.innerHTML
    })

    describe('succeeds', () => {
      beforeEach(() => {
        file = new File([sampleCsv], 'test.csv')
        event = new CustomEvent(EventType.FileUpload, {
          bubbles: true,
          detail: file
        })
        spyOn(event, 'stopPropagation')
        return handleEvent(event)
      })

      it('should stop the event from propagating further', () => {
        expect(event.stopPropagation).toHaveBeenCalled()
      })

      it('should re-render the app', () => {
        expect(container.innerHTML).not.toBe(oldContents)
      })

      xit('should update the transactions', () => {
        // TODO
      })

      xit('should not duplicate transactions', () => {
        // TODO
      })

      it('should update the accounts', () => {
        expect(container.innerHTML).toContain(accountName)
      })
    })

    describe('fails reading the file', () => {
      beforeEach(() => {
        event = new CustomEvent(EventType.FileUpload, {
          bubbles: true,
          detail: {}
        })
        return handleEvent(event)
      })

      it('should not update the app', () => {
        expect(container.innerHTML).toBe(oldContents)
      })
    })
  })

  describe('render()', () => {
    it('should render the app into the container', () => {
      expect(container.innerHTML).not.toBe('')
    })
  })
})
