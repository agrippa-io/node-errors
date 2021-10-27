import { ErrorAPI } from './ErrorAPI'

export class ErrorJWTWhitelistMissing extends ErrorAPI {
  constructor(message = 'JWT Token missing from whitelist') {
    super(`ErrorJWTWhitelistMissing: ${message}`, 401)
    Error.captureStackTrace(this, this.constructor)

    this.name = 'ErrorJWTWhitelistMissing'
    this.prototype = ErrorAPI
  }
}
