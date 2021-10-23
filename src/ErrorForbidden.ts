import ErrorAPI from './ErrorAPI'

export default class ErrorForbidden extends ErrorAPI {
  constructor(message = 'Forbidden') {
    super(message, 403)
    Error.captureStackTrace(this, this.constructor)

    this.name = 'ErrorForbidden'
    this.prototype = ErrorAPI
  }
}
