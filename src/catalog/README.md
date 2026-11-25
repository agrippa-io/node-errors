# catalog

Error catalogs: every typed error a service can return, as data. Each entry
carries a stable `code`, the `httpStatus`, a `title`, its `meaning`, the
`remediation` and whether it is `retryable`. The catalog exports as
`errors.json`, which the docs platform ingests and attaches to the operations
that list the code under `x-errors`.

```ts
import { defineErrorCatalog } from '@agrippa-io/node-errors'

export const errors = defineErrorCatalog({
  service: 'catalog',
  errors: [
    {
      code: 'PRODUCT_NOT_FOUND',
      httpStatus: 404,
      title: 'Product not found',
      meaning: 'No product has this id in the caller\'s organization.',
      remediation: 'Check the id; list products to find it.',
      retryable: false
    }
  ]
})

throw errors.error('PRODUCT_NOT_FOUND', `product ${id} not found`, { id })
fs.writeFileSync('errors.json', JSON.stringify(errors, null, 2))
```

| Export | What it does |
|---|---|
| `defineErrorCatalog({ service, errors })` | Validates and freezes a catalog. Throws `ErrorCatalogDefinitionError` listing **every** problem. Codes are typed: `errors.error('TYPO')` fails to compile |
| `catalog.error(code, message?, details?)` | A `CatalogError` (an `HttpError`) with the entry's status, `code`, `title`, `retryable`. Message defaults to the title |
| `catalog.has(code)` / `catalog.get(code)` / `catalog.codes` / `catalog.entries` | Lookups |
| `catalog.toJSON()` | The `errors.json` document, sorted by code; `JSON.stringify(catalog)` uses it |
| `parseErrorCatalog(json)` | Validates a document (format, version, entries) and returns a catalog. For ingesters |
| `isCatalogError(err, code?)` | Type guard, optionally for one code |
| `platformErrorCatalog` | The errors any operation can return from the shared middleware (below) |

## Rules

- `code`: UPPER_SNAKE_CASE (`ERROR_CODE_PATTERN`), unique in the catalog. A code
  is public and permanent: clients branch on it. Never rename or reuse one.
- `httpStatus`: an integer from 400 to 599.
- `title`, `meaning`, `remediation`: non-empty. Write `meaning` as *when and
  why* it happens and `remediation` as *what the caller does next*.
- `retryable`: `true` only when the same request, unchanged, can succeed later.
- A service declares **only its domain codes**. Platform errors are attached to
  every operation by the docs service.

## `errors.json`

```json
{
  "format": "agrippa.error-catalog",
  "version": 1,
  "service": "catalog",
  "errors": [
    { "code": "PRODUCT_NOT_FOUND", "httpStatus": 404, "title": "Product not found",
      "meaning": "…", "remediation": "…", "retryable": false }
  ]
}
```

`version` is bumped only on a breaking shape change; `parseErrorCatalog` rejects
any other version.

## Platform errors

| Code | Status | Retryable | Raised by |
|---|---|---|---|
| `BAD_REQUEST` | 400 | no | malformed JSON / payload too large (node-http error handler), `BadRequestError` |
| `VALIDATION_FAILED` | 400 | no | zod validation (node-http `validate*`) |
| `UNAUTHORIZED` | 401 | no | auth middleware |
| `FORBIDDEN` | 403 | no | authz enforcement, scope checks |
| `NOT_FOUND` | 404 | no | `notFoundHandler`, `NotFoundError` |
| `CONFLICT` | 409 | no | `ConflictError` |
| `UNPROCESSABLE_ENTITY` | 422 | no | business-rule rejections |
| `RATE_LIMITED` | 429 | yes | node-http rate limit |
| `INTERNAL_ERROR` | 500 | yes | any unhandled error |
| `SERVICE_UNAVAILABLE` | 503 | yes | `ServiceUnavailableError`, readiness |
