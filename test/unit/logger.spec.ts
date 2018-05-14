import { JasmineKarmaTypeScriptMocker as mock } from 'karma-typescript-mock'
import { log } from '../../src/logger'

interface Mocker {
  [method: string]: () => jasmine.Spy
}

describe('logger', () => {
  const loglevelMethods = [
    'debug',
    'error',
    'info',
    'setLevel',
    'warn'
  ]
  const loglevelSpy = jasmine.createSpyObj('loglevel', loglevelMethods)

  const mocker: Mocker = loglevelMethods.reduce<Mocker>((soFar, method) => {
    soFar[method] = () => loglevelSpy[method]
    return soFar
  }, {})
  mock('loglevel', mocker)

  beforeEach(() => {
    loglevelMethods.forEach(method => {
      loglevelSpy[method].calls.reset()
    })
    spyOn(window, 'alert')
  })

  describe('write()', () => {
    it('should set the underlying log level', () => {
      log.write(log.Level.Info, 'test')
      expect(loglevelSpy.setLevel).toHaveBeenCalled()
    })

    it('should write to the debug logger when level is Debug', () => {
      log.write(log.Level.Debug, 'test')
      expect(loglevelSpy.debug).toHaveBeenCalled()
    })

    it('should write to the info logger when level is Info', () => {
      log.write(log.Level.Info, 'test')
      expect(loglevelSpy.info).toHaveBeenCalled()
    })

    it('should write to the info logger when level is Notice', () => {
      log.write(log.Level.Notice, 'test')
      expect(loglevelSpy.info).toHaveBeenCalled()
    })

    it('should write to the warn logger when level is Warning', () => {
      log.write(log.Level.Warning, 'test')
      expect(loglevelSpy.warn).toHaveBeenCalled()
    })

    it('should write to the error logger when level is Error', () => {
      log.write(log.Level.Error, 'test')
      expect(loglevelSpy.error).toHaveBeenCalled()
    })

    it('should write to the error logger when level is Critical', () => {
      log.write(log.Level.Critical, 'test')
      expect(loglevelSpy.error).toHaveBeenCalled()
    })

    it('should write the arguments to the underlying logger', () => {
      log.write(log.Level.Info, 'this', 'is', 'a', 'test')
      expect(loglevelSpy.info).toHaveBeenCalledWith('this', 'is', 'a', 'test')
    })
  })

  describe('critical()', () => {
    beforeEach(() => {
      log.critical('this', 'is', 'a', 'test')
    })

    it('should write the arguments to the error logger', () => {
      expect(loglevelSpy.error).toHaveBeenCalledWith('this', 'is', 'a', 'test')
    })

    it('should display an error popup', () => {
      expect(window.alert).toHaveBeenCalled()
    })
  })

  describe('debug()', () => {
    it('should write the arguments to the debug logger', () => {
      log.debug('this', 'is', 'a', 'test')
      expect(loglevelSpy.debug).toHaveBeenCalledWith('this', 'is', 'a', 'test')
    })
  })

  describe('error()', () => {
    beforeEach(() => {
      log.error('this', 'is', 'a', 'test')
    })

    it('should write the arguments to the error logger', () => {
      expect(loglevelSpy.error).toHaveBeenCalledWith('this', 'is', 'a', 'test')
    })

    it('should display an error popup', () => {
      expect(window.alert).toHaveBeenCalled()
    })
  })

  describe('info()', () => {
    it('should write the arguments to the info logger', () => {
      log.info('this', 'is', 'a', 'test')
      expect(loglevelSpy.info).toHaveBeenCalledWith('this', 'is', 'a', 'test')
    })
  })

  describe('notice()', () => {
    it('should write the arguments to the info logger', () => {
      log.notice('this', 'is', 'a', 'test')
      expect(loglevelSpy.info).toHaveBeenCalledWith('this', 'is', 'a', 'test')
    })
  })

  describe('warn()', () => {
    it('should write the arguments to the warn logger', () => {
      log.warn('this', 'is', 'a', 'test')
      expect(loglevelSpy.warn).toHaveBeenCalledWith('this', 'is', 'a', 'test')
    })
  })
})
