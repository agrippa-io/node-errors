import ErrorAPI from '..//ErrorAPI'

export default class ErrorUserCreate extends ErrorAPI {
  constructor(message = 'Failed to create User') {
    super(`ErrorUserCreate: ${message}`)
    Error.captureStackTrace(this, this.constructor)

    this.name = 'ErrorUserEmailCollision'
    this.prototype = ErrorAPI
  }
}
