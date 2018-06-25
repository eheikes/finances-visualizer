import { loadCsv } from '../../../src/file-loaders/csv-loader'
import { Transaction } from '../../../src/transaction'
import {
  accountName,
  numTransactions,
  sampleCsv,
  splitCategories,
  splitIndex
} from '../../fixtures/csv'
import { toBeTransaction } from '../../helpers/matchers'

describe('CSV loader', () => {
  beforeEach(() => {
    jasmine.addMatchers({ toBeTransaction })
  })

  describe('when a parsing error occurs', () => {
    it('should reject the promise', () => {
      let badArg = {}
      return loadCsv(badArg as string).then(() => {
        throw new Error('Expected method to throw!')
      }).catch(err => {
        expect(err.message).not.toMatch(/Expected method to throw/)
      })
    })
  })

  describe('when parsing succeeds', () => {
    let results: Transaction[]

    beforeEach(async () => {
      results = await loadCsv(sampleCsv)
    })

    it('should return an array of transactions', () => {
      results.forEach(result => {
        expect(result).toBeTransaction()
      })
    })

    it('should generate a SHA-1 hash for the ID', () => {
      expect(results[0].id).toMatch(/^[a-f0-9]{40}$/)
    })

    it('should skip empty lines and non-transaction rows', () => {
      expect(results.length).toBe(numTransactions)
    })

    it('should remove the first column', () => {
      expect(results[0].account).toBe(accountName)
    })

    it('should remove the header row', () => {
      expect(Number(results[0].date)).not.toBeNaN()
    })

    it('should parse transactions that span multiple rows (e.g., split categories)', () => {
      expect(results[splitIndex].categories).toEqual(splitCategories.map(([category, amount]) => {
        return { category, amount }
      }))
    })

    it('should total transactions that span multiple rows', () => {
      expect(results[splitIndex].amount).toBe(
        splitCategories.reduce((soFar, [, amount]) => {
          soFar += amount
          return soFar
        }, 0)
      )
    })

    it('should ignore malformed split transactions', async () => {
      // CSV with a continuation but no previous transaction.
      const badCsv = `
,Date,Account,Num,Description,Memo,Category,Tag,Clr,Amount
,BALANCE 1/10/2015,,,,,,,,0.00
,,,,,,Home:Furnishings,,R,-19.99
`.trim()
      results = await loadCsv(badCsv)
      expect(results).toEqual([])
    })
  })
})
