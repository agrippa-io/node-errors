# @agrippa-io/node-errors

HTTP error classes for `@agrippa-io` node services: `HttpError` and the 4xx/5xx
subclasses every service used to declare for itself, plus **error catalogs**
(`defineErrorCatalog`): each error's stable code, status, meaning and
remediation as data, exported as `errors.json` for the docs platform. **Zero dependencies**, so
any library can throw them without pulling in Express. Part of
[shared-libs-1](https://github.com/agrippa-io/agrippa-stack/tree/develop/epics/shared-libs-1) (SL-3).

**Public package** (unlike the other `@agrippa-io/*` libraries): no npm token
needed. Releases are staged by CI and go live once a maintainer approves them
with 2FA; see the library template README, "Releasing".

```bash
npm install @agrippa-io/node-errors
```

## Usage

```ts
import { NotFoundError, BadRequestError, HttpError } from '@agrippa-io/node-errors'

throw new NotFoundError(`widget ${id} not found`)
throw new BadRequestError('Invalid filter', { field: 'from', issue: 'must be a date' })

class LockedOutError extends HttpError {
  constructor() { super(429, 'Too many login attempts') }
}
```

`@agrippa-io/node-http`'s error handler turns any `HttpError` into
`res.status(status).json({ error: message })`, adding `details` when it is set.
Everything else becomes a logged `500 { error: 'Internal Server Error' }`.

| Class | Status | Default message |
|---|---|---|
| `HttpError(status, message, details?)` | any | — |
| `BadRequestError(message?, details?)` | 400 | `Bad Request` |
| `UnauthorizedError(message?, details?)` | 401 | `Unauthorized` |
| `ForbiddenError(message?, details?)` | 403 | `Forbidden` |
| `NotFoundError(message?, details?)` | 404 | `Not Found` |
| `ConflictError(message?, details?)` | 409 | `Conflict` |
| `ServiceUnavailableError(message?, details?)` | 503 | `Service Unavailable` |

Root and the `/http` subpath export the same symbols. Constructing an error has
no side effects.

## Error catalog

Declare a service's domain errors once; throw them by code and publish them
with the spec ([docs-platform-0](https://github.com/agrippa-io/agrippa-stack/tree/develop/epics/docs-platform-0) slice 04).

```ts
import { defineErrorCatalog, platformErrorCatalog } from '@agrippa-io/node-errors'

export const errors = defineErrorCatalog({
  service: 'catalog',
  errors: [{
    code: 'PRODUCT_NOT_FOUND', httpStatus: 404, title: 'Product not found',
    meaning: 'No product has this id in the caller\'s organization.',
    remediation: 'Check the id; list products to find it.', retryable: false
  }]
})

throw errors.error('PRODUCT_NOT_FOUND', `product ${id} not found`) // a CatalogError (HttpError, status 404, code)
JSON.stringify(errors)                                             // errors.json
```

`platformErrorCatalog` holds the errors every operation can return from the
shared middleware (400 / 401 / 403 / 404 / 409 / 422 / 429 / 500 / 503).
`parseErrorCatalog(json)` validates an `errors.json` for ingesters. Rules, the
document format and the platform codes: [src/catalog/README.md](src/catalog/README.md).
Also available from the `/catalog` subpath.

## Migrating from 1.x

2.0.0 is a rewrite. 1.x stays published for the two legacy services that pin
`^1.0.10` (`node-event-handler`, `node-service-project-generation`); nothing in
2.x is shared with it.

| 1.x | 2.x | Notes |
|---|---|---|
| `ErrorAPI(message, status = 500)` | `HttpError(status, message, details?)` | **Argument order swapped**, status first. No default status |
| `ErrorBadRequest(message?, data?)` | `BadRequestError(message?, details?)` | `data` → `details`; defaults to unset instead of `{}` |
| `ErrorUnauthorized(message?, data?)` | `UnauthorizedError(message?, details?)` | |
| `ErrorForbidden(message?)` | `ForbiddenError(message?, details?)` | |
| `ErrorResourceNotFound(message?, data?)` | `NotFoundError(message?, details?)` | 1.x prefixed the message with `ErrorResourceNotFound: `; 2.x does not |
| `ErrorResourceAlreadyExists` (400) | `ConflictError` (409) | Status changes from 400 to 409 |
| `ErrorServer` (500) | throw any `Error` | The handler maps unknown errors to a logged 500 |
| — | `ServiceUnavailableError` (503) | New |
| `ErrorMongoose`, `ErrorInvalidData`, `ErrorMissingArgument`, `ErrorReadOnly`, `ErrorUser*`, `MongooseCodes`, … | removed | Mongoose- and app-specific; stay on `^1` |
| constructor called `Logger.error(this)` | no side effects | Log once, in the error handler |
| depended on `@agrippa-io/node-utils` | no dependencies | |

## Commands

```bash
npm install
npm test                # vitest
npm run test:coverage   # 100% gate
npm run lint
npm run typecheck
npm run build           # dist/ + export check
```

## Releasing

Same flow as every library made from `node-library-template` (gitflow,
`release-stage` → release PR into `main` → staged version → 2FA approval), with
one difference: `access: public`. See the
[library template README](https://github.com/agrippa-io/node-library-template#readme).
