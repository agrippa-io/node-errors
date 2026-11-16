import {
  HttpError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ServiceUnavailableError
} from 'src/http'

describe('HttpError', () => {
  it('carries status, message and name, and is a real Error', () => {
    const err = new HttpError(418, 'teapot')
    expect(err).toBeInstanceOf(Error)
    expect(err).toBeInstanceOf(HttpError)
    expect(err.status).toBe(418)
    expect(err.message).toBe('teapot')
    expect(err.name).toBe('HttpError')
    expect(err.details).toBeUndefined()
    expect(err.stack).toContain('teapot')
  })

  it('keeps optional details', () => {
    const details = { field: 'email', issue: 'taken' }
    expect(new HttpError(422, 'invalid', details).details).toBe(details)
  })

  it('subclasses from a service keep working (auth-service route-local errors)', () => {
    class LockedOutError extends HttpError {
      constructor() { super(429, 'Too many login attempts') }
    }
    const err = new LockedOutError()
    expect(err).toBeInstanceOf(HttpError)
    expect(err.status).toBe(429)
    expect(err.message).toBe('Too many login attempts')
  })
})

// The exact names, status codes and default messages every service declares today.
const cases = [
  { Cls: BadRequestError, status: 400, defaultMessage: 'Bad Request', name: 'BadRequestError' },
  { Cls: UnauthorizedError, status: 401, defaultMessage: 'Unauthorized', name: 'UnauthorizedError' },
  { Cls: ForbiddenError, status: 403, defaultMessage: 'Forbidden', name: 'ForbiddenError' },
  { Cls: NotFoundError, status: 404, defaultMessage: 'Not Found', name: 'NotFoundError' },
  { Cls: ConflictError, status: 409, defaultMessage: 'Conflict', name: 'ConflictError' },
  { Cls: ServiceUnavailableError, status: 503, defaultMessage: 'Service Unavailable', name: 'ServiceUnavailableError' }
] as const

describe.each(cases)('$name', ({ Cls, status, defaultMessage, name }) => {
  it(`defaults to ${status} "${defaultMessage}"`, () => {
    const err = new Cls()
    expect(err).toBeInstanceOf(HttpError)
    expect(err).toBeInstanceOf(Error)
    expect(err.status).toBe(status)
    expect(err.message).toBe(defaultMessage)
    expect(err.name).toBe(name)
    expect(err.details).toBeUndefined()
  })

  it('takes a custom message and details', () => {
    const err = new Cls('custom', { id: 'x' })
    expect(err.status).toBe(status)
    expect(err.message).toBe('custom')
    expect(err.details).toEqual({ id: 'x' })
  })
})

describe('no side effects', () => {
  it('constructing an error writes nothing to the console (1.x logged here)', () => {
    const spies = (['log', 'error', 'warn', 'info'] as const).map((m) => vi.spyOn(console, m).mockImplementation(() => undefined))
    new NotFoundError()
    new HttpError(500, 'boom')
    for (const spy of spies) {
      expect(spy).not.toHaveBeenCalled()
      spy.mockRestore()
    }
  })
})
