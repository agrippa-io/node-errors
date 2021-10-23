import ErrorAPI from './ErrorAPI'

export default class ErrorBadRequest extends ErrorAPI {
  data: any

  constructor(message = 'Server Error', data = {}) {
    super(message, 500)
    Error.captureStackTrace(this, this.constructor)
    this.name = 'ErrorServer'
    this.prototype = ErrorAPI
    this.data = data
  }
}
