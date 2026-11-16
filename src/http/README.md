# http

HTTP error classes. Throw one from a route or service; `@agrippa-io/node-http`'s
error handler turns it into JSON.

| Class | Status | Default message |
|---|---|---|
| `HttpError(status, message, details?)` | any | — |
| `BadRequestError(message?, details?)` | 400 | `Bad Request` |
| `UnauthorizedError(message?, details?)` | 401 | `Unauthorized` |
| `ForbiddenError(message?, details?)` | 403 | `Forbidden` |
| `NotFoundError(message?, details?)` | 404 | `Not Found` |
| `ConflictError(message?, details?)` | 409 | `Conflict` |
| `ServiceUnavailableError(message?, details?)` | 503 | `Service Unavailable` |

The handler responds `{ error: message }`, plus `details` when it is set. For a
status without a class, subclass `HttpError`:

```ts
import { HttpError, NotFoundError } from '@agrippa-io/node-errors'

class LockedOutError extends HttpError {
  constructor() { super(429, 'Too many login attempts') }
}

throw new NotFoundError(`widget ${id} not found`)
throw new BadRequestError('Invalid filter', { field: 'from', issue: 'must be a date' })
```

Constructing an error has no side effects; log in the error handler, once.
