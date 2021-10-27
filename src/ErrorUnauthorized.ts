import { ErrorAPI } from './ErrorAPI'

export class ErrorUnauthorized extends ErrorAPI {
  data: any

  constructor(message = 'Unauthorized', data = {}) {
    super(message, 401)
    Error.captureStackTrace(this, this.constructor)
    this.name = 'ErrorUnauthorized'
    this.prototype = ErrorAPI
    this.data = data
  }
}
