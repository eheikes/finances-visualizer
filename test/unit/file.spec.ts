import { JasmineKarmaTypeScriptMocker as mock } from 'karma-typescript-mock'
import { readFile } from '../../src/file'
import { Transaction } from '../../src/transaction'
import { sampleTransactions } from '../fixtures/transactions'

interface ReaderTests {
  [name:string]: File
}

describe('readFile()', () => {
  const csvSpy = jasmine.createSpy('loadCsv')

  let results: Transaction[] | Error | null

  beforeEach(() => {
    results = null
  })

  describe('when the file is read successfully', () => {
    let file: File

    mock('./file-loaders/csv-loader', {
      loadCsv: () => () => Promise.resolve(sampleTransactions)
    })

    beforeEach(async () => {
      file = new File(['test file'], 'test.csv', { type: 'text/csv' })
      results = await readFile(file)
    })

    it('should resolve with an array of transactions', () => {
      expect(results).toEqual(sampleTransactions)
    })
  })

  const csvTests: ReaderTests = {
    'the file has a CSV mime type': new File(['test file'], 'test.txt', { type: 'text/csv' }),
    'the file has a CSV file extension': new File(['test file'], 'test.csv')
  }
  for (let name in csvTests) {
    describe(`when ${name}`, () => {
      mock('./file-loaders/csv-loader', {
        loadCsv: () => csvSpy
      })

      describe('and can be loaded', () => {
        beforeEach(async () => {
          csvSpy.and.returnValue(Promise.resolve(sampleTransactions))
          results = await readFile(csvTests[name])
        })

        it('should use the CSV loader', () => {
          expect(csvSpy).toHaveBeenCalled()
        })

        it('should return the array of transactions', () => {
          expect(results).toEqual(sampleTransactions)
        })
      })

      describe('and cannot be loaded', () => {
        beforeEach(async () => {
          csvSpy.and.returnValue(Promise.reject(new Error('test error')))
          try {
            await readFile(csvTests[name])
          } catch (err) {
            results = err
          }
        })

        it('should return the error', () => {
          const err = results as Error
          expect(err).toEqual(jasmine.any(Error))
          expect(err.message).toBe('test error')
        })
      })
    })
  }

  const unknownTests: ReaderTests = {
    'the file has an Excel mime type': new File(['test file'], 'test.txt', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }),
    'the file has an Excel file extension': new File(['test file'], 'test.xlsx'),
    'the file has a Qif mime type': new File(['test file'], 'test.txt', { type: 'application/x-qw' }),
    'the file has a Qif file extension': new File(['test file'], 'test.qif'),
    'the file does not match any mime type or file extension': new File(['test file'], 'test.txt')
  }
  for (let name in unknownTests) {
    describe(`when ${name}`, () => {
      beforeEach(async () => {
        results = await readFile(unknownTests[name])
      })

      it('should return an empty array', () => {
        expect(results).toEqual([])
      })
    })
  }
})
