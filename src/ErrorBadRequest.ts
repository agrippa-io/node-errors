import ErrorAPI from './ErrorAPI'

export default class ErrorBadRequest extends ErrorAPI {
  data: any

  constructor(message = 'Bad Request', data = {}) {
    super(message, 400)
    Error.captureStackTrace(this, this.constructor)
    this.name = 'ErrorBadRequest'
    this.prototype = ErrorAPI
    this.data = data
  }
}
