import ErrorAPI from './ErrorAPI'

export default class ErrorInvalidUploadStrategy extends ErrorAPI {
  constructor(message = 'Failed to upload due to invalid Upload Strategy') {
    super(`ErrorInvalidUploadStrategy: ${message}`)
    Error.captureStackTrace(this, this.constructor)

    this.name = 'ErrorInvalidUploadStrategy'
    this.prototype = ErrorAPI
  }
}
