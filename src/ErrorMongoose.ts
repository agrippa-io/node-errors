import { ErrorAPI } from './ErrorAPI'

export class ErrorMongoose extends ErrorAPI {
  data: any

  constructor(message = 'Bad Request', mongooseError = null, data = {}) {
    super(generateEdisenMongooseErrorMessage(message, mongooseError), 422)
    Error.captureStackTrace(this, this.constructor)
    this.name = 'ErrorBadRequest'
    this.prototype = ErrorAPI
    this.data = data
  }
}

function generateEdisenMongooseErrorMessage(message, error) {
  switch (error.name) {
    case 'ValidationError':
      const secondaryMessage = Object.keys(error.errors)
        .map((errKey) => {
          const err = error.errors[errKey]
          const props = err?.properties

          return `['${err?.path ?? 'unknown'}'] - ${
            err?.reason?.message ?? `Invalid value${props?.value && ` '${props?.value}'`}`
          }`
        })
        .join(', ')

      return `ErrorBadRequest: ${message} - ValidationErrors: ${secondaryMessage}`

    case 'CastError':
      return `ErrorBadRequest: ${message} - Query Argument['${error?.path ?? 'unknown'}'] - ${
        error?.reason?.message ?? 'Invalid'
      }`

    default:
      return `Unhandled Mongoose Error: ${error.name}`
  }
}
