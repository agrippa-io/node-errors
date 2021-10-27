import { ErrorAPI } from './ErrorAPI'

export class ErrorResourceAlreadyExists extends ErrorAPI {
  data: any

  constructor(message = 'Resource Already Exists', data = {}) {
    super(`ErrorResourceAlreadyExists: ${message}`, 400)
    Error.captureStackTrace(this, this.constructor)
    this.name = 'ErrorResourceAlreadyExists'
    this.prototype = ErrorAPI
    this.data = data
  }
}
