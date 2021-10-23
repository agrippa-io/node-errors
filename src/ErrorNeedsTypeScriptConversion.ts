import ErrorAPI from './ErrorAPI'

export default class ErrorNeedsTypeScriptConversion extends ErrorAPI {
  constructor(message: string) {
    super(`ErrorNeedsTypeScriptConversion: ${message}`)
    Error.captureStackTrace(this, this.constructor)

    this.name = 'ErrorNeedsTypeScriptConversion'
    this.prototype = ErrorAPI
  }
}
