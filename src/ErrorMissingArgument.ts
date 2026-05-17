import { ErrorAPI } from 'src/ErrorAPI'

export class ErrorMissingArgument extends ErrorAPI {
  constructor(message: string) {
    super(`ErrorMissingArgument: ${message}`, 400)
    Error.captureStackTrace(this, this.constructor)

    this.name = 'ErrorMissingArgument'
    this.prototype = ErrorAPI
  }
}
