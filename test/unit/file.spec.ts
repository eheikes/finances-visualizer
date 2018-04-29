import { JasmineKarmaTypeScriptMocker as mock } from 'karma-typescript-mock'
import { readFile } from '../../src/file'
import { Transaction } from '../../src/transaction'
import { sampleTransactions } from '../fixtures/transactions'

describe('readFile()', () => {
  mock('./file-loaders/csv-loader', {
    loadCsv: () => () => Promise.resolve(sampleTransactions)
  })

  let file: File
  let results: Transaction[]

  describe('when the file is read successfully', () => {
    beforeEach(async () => {
      file = new File(['test file'], 'test.csv', { type: 'text/csv' })
      results = await readFile(file)
    })

    it('should resolve with an array of transactions', () => {
      expect(results).toEqual(sampleTransactions)
    })
  })

  describe('when an error occurs reading the file', () => {
    it('should return a rejection', () => {})
  })

  describe('when the file has a CSV mime type', () => {})
  describe('when the file has an Excel mime type', () => {})
  describe('when the file has a Qif mime type', () => {})
  describe('when the file has a CSV file extension', () => {})
  describe('when the file has an Excel file extension', () => {})
  describe('when the file has a Qif file extension', () => {})
  describe('when the file does not match any mime type or file extension', () => {})
})
