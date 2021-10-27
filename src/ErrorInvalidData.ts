import { ErrorAPI } from './ErrorAPI'

export class ErrorInvalidData extends ErrorAPI {
  constructor(message: string, status = 422) {
    super(`ErrorInvalidData: ${message}`, status)
    Error.captureStackTrace(this, this.constructor)

    this.name = 'ErrorInvalidData'
    this.prototype = ErrorAPI
  }
}
