import { ErrorAPI } from './ErrorAPI'

export default class ErrorMongoose extends ErrorAPI {
  data: any

  constructor(message = 'Property is Read Only', data = {}) {
    super(`ErrorReadOnly: ${message}`, 422)
    Error.captureStackTrace(this, this.constructor)
    this.name = 'ErrorReadOnly'
    this.prototype = ErrorAPI
    this.data = data
  }
}
