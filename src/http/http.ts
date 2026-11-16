/**
 * Base class for errors that map to an HTTP response. `@agrippa-io/node-http`'s
 * error handler turns one into `res.status(status).json({ error: message })`,
 * plus `details` when it is set.
 *
 * Constructing an error has no side effects (1.x logged in the constructor):
 * the error handler logs once.
 */
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    /** Optional structured context (e.g. field errors), sent as `details` when set. */
    public readonly details?: unknown
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

/** 400 */
export class BadRequestError extends HttpError {
  constructor(message = 'Bad Request', details?: unknown) {
    super(400, message, details)
    this.name = 'BadRequestError'
  }
}

/** 401 */
export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized', details?: unknown) {
    super(401, message, details)
    this.name = 'UnauthorizedError'
  }
}

/** 403 */
export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden', details?: unknown) {
    super(403, message, details)
    this.name = 'ForbiddenError'
  }
}

/** 404 */
export class NotFoundError extends HttpError {
  constructor(message = 'Not Found', details?: unknown) {
    super(404, message, details)
    this.name = 'NotFoundError'
  }
}

/** 409 */
export class ConflictError extends HttpError {
  constructor(message = 'Conflict', details?: unknown) {
    super(409, message, details)
    this.name = 'ConflictError'
  }
}

/** 503 */
export class ServiceUnavailableError extends HttpError {
  constructor(message = 'Service Unavailable', details?: unknown) {
    super(503, message, details)
    this.name = 'ServiceUnavailableError'
  }
}
