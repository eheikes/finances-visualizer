import * as loglevel from 'loglevel'

// For no particular reason, the levels match up with the
//   priorities in RFC 5424.
//   See https://tools.ietf.org/html/rfc5424#section-6.2.1
enum LogLevel {
  Critical = 2, // fatal error
  Error = 3, // non-fatal error
  Warning = 4,
  Notice = 5, // normal but significant
  Info = 6,
  Debug = 7
}

const write = (type: LogLevel, ...messages: any[]) => {
  loglevel.setLevel(loglevel.levels.DEBUG)
  if (type >= LogLevel.Debug) {
    loglevel.debug(...messages)
  } else if (type >= LogLevel.Notice) {
    loglevel.info(...messages)
  } else if (type >= LogLevel.Warning) {
    loglevel.warn(...messages)
  } else {
    loglevel.error(...messages)
  }
}

const critical = (...messages: any[]) => {
  return write(LogLevel.Critical, ...messages)
}

const debug = (...messages: any[]) => {
  return write(LogLevel.Debug, ...messages)
}

const error = (...messages: any[]) => {
  return write(LogLevel.Error, ...messages)
}

const info = (...messages: any[]) => {
  return write(LogLevel.Info, ...messages)
}

const notice = (...messages: any[]) => {
  return write(LogLevel.Notice, ...messages)
}

const warn = (...messages: any[]) => {
  return write(LogLevel.Warning, ...messages)
}

export const log = {
  Level: LogLevel,
  write,
  critical,
  debug,
  error,
  info,
  notice,
  warn
}
