import { ErrorAPI } from './ErrorAPI'

export class ErrorMissingMongooseHookRegistration extends ErrorAPI {
  constructor(message: string) {
    super(`ErrorMissingMongooseHookRegistration: ${message}`, 400)
    Error.captureStackTrace(this, this.constructor)

    this.name = 'ErrorMissingMongooseHookRegistration'
    this.prototype = ErrorAPI
  }
}
