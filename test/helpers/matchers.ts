export const toBeTransaction: jasmine.CustomMatcherFactory = () => {
  return {
    compare: (actual: any) => {
      let result = {
        pass: true,
        message: ''
      }
      if (typeof actual === 'object') {
        if (typeof actual.id !== 'string') { result.pass = false }
        if (!(actual.date instanceof Date)) { result.pass = false }
        if (typeof actual.account !== 'string') { result.pass = false }
        if (typeof actual.payee !== 'string') { result.pass = false }
        if (typeof actual.memo !== 'string') { result.pass = false }
        if (!Array.isArray(actual.categories)) { result.pass = false }
        if (typeof actual.status !== 'string') { result.pass = false }
        if (typeof actual.amount !== 'number') { result.pass = false }
      } else {
        result.pass = false
      }
      if (result.pass) {
        result.message = `Expected ${JSON.stringify(actual)} not to be a transaction`
      } else {
        result.message = `Expected ${JSON.stringify(actual)} to be a transaction, but it was not a transaction`
      }
      return result
    }
  }
}
