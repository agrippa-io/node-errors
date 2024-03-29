import { ErrorAPI } from '../ErrorAPI'

export class ErrorUserEmailCollision extends ErrorAPI {
  constructor(message: string) {
    super(`ErrorUserEmailCollision: ${message}`, 401)
    Error.captureStackTrace(this, this.constructor)

    this.name = 'ErrorUserEmailCollision'
    this.prototype = ErrorAPI
  }
}
