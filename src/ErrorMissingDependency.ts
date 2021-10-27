import { ErrorAPI } from './ErrorAPI'

export class ErrorMissingDependency extends ErrorAPI {
  constructor(message: string) {
    super(`ErrorMissingDependency: ${message}`)
    Error.captureStackTrace(this, this.constructor)

    this.name = 'ErrorMissingDependency'
    this.prototype = ErrorAPI
  }
}
