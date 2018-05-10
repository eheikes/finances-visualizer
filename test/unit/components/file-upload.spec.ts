import * as React from 'react'
import { FileUpload } from '../../../src/components/file-upload'
import { EventType } from '../../../src/event'

describe('FileUpload component', () => {
  let el: JSX.Element

  beforeEach(() => {
    el = FileUpload({})
  })

  it('should return an <input type="file">', () => {
    expect(el.type).toBe('input')
    expect(el.props.type).toBe('file')
  })

  it('should accept multiple files', () => {
    expect(el.props.multiple).toBeDefined()
  })

  it('should accept the supported files', () => {
    const accepted = el.props.accept.split(/[,\s]+/)
    expect(accepted).toContain('.csv')
    expect(accepted).toContain('.qif')
    expect(accepted).toContain('.xlsx')
  })

  it('should have a "change" event handler', () => {
    expect(el.props.onChange).toEqual(jasmine.any(Function))
  })

  describe('when a "change" event is fired', () => {
    let event: React.ChangeEvent<HTMLInputElement>

    const createEvent = (files: File[] | null = null): React.ChangeEvent<HTMLInputElement> => {
      event = {
        preventDefault: () => {}, // tslint:disable-line:no-empty
        target: {
          dispatchEvent: (e: Event) => true,
          files: files,
          value: 'filename.txt'
        }
      } as React.ChangeEvent<HTMLInputElement>
      spyOn(event, 'preventDefault')
      spyOn(event.target, 'dispatchEvent')
      return event
    }

    describe('but no files were uploaded', () => {
      beforeEach(() => {
        event = createEvent()
        el.props.onChange(event)
      })

      it('should prevent the default action', () => {
        expect(event.preventDefault).toHaveBeenCalled()
      })

      it('should not dispatch any events', () => {
        expect(event.target.dispatchEvent).not.toHaveBeenCalled()
      })

      it('should reset the input field', () => {
        expect(event.target.value).toBe('')
      })
    })

    describe('and files were uploaded', () => {
      let files: File[]
      let spy: jasmine.Spy

      beforeEach(() => {
        files = [
          new File(['file0'], 'file0.txt'),
          new File(['file1'], 'file1.txt')
        ]
        event = createEvent(files)
        spy = event.target.dispatchEvent as jasmine.Spy
        el.props.onChange(event)
      })

      it('should prevent the default action', () => {
        expect(event.preventDefault).toHaveBeenCalled()
      })

      it('should dispatch a FileUpload event for each file', () => {
        const eventTypes = spy.calls.allArgs().map(args => args[0].type)
        expect(spy).toHaveBeenCalled()
        expect(spy.calls.count()).toBe(files.length)
        expect(eventTypes.every(type => type === EventType.FileUpload)).toBe(true)
      })

      it('should let the events bubble up', () => {
        const eventBubbles = spy.calls.allArgs().every(args => args[0].bubbles)
        expect(eventBubbles).toBe(true)
      })

      it('should pass the file in the event detail', () => {
        expect(spy.calls.argsFor(0)[0].detail).toEqual(files[0])
        expect(spy.calls.argsFor(1)[0].detail).toEqual(files[1])
      })

      it('should reset the input field', () => {
        expect(event.target.value).toBe('')
      })
    })
  })
})
