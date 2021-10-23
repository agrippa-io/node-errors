import ErrorAPI from './ErrorAPI'

export default class ErrorIncompleteDataModification extends ErrorAPI {
  constructor(message: string) {
    super(`ErrorIncompleteDataModification: ${message}`)
    Error.captureStackTrace(this, this.constructor)

    this.name = 'ErrorIncompleteDataModification'
    this.prototype = ErrorAPI
  }
}
