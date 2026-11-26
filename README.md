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

## Publishing docs

This library's API reference goes to the docs platform (`node-service-docs`) as the
`library` source `node-errors`, in TypeDoc JSON: `npm run docs:typedoc` writes `docs/typedoc.json`
(not committed) from every entry point in [`typedoc.json`](typedoc.json), one TypeDoc module
per `exports` subpath. The reference page shows each export's signature and its TSDoc
comment, so the first paragraph of a comment is its summary and `@example` blocks become
its examples. Add a subpath to `exports` and to `typedoc.json` together.

The shared [`publish-docs` workflow](https://github.com/agrippa-io/github-actions/blob/main/docs/README.md#reusable-workflow-publish-docsyml) (github-actions `v1.13.0`) does the publishing:

- **Pull requests:** job `publish-docs` in `.github/workflows/ci.yml`, after `ci-ok`,
  builds the TypeDoc JSON (`npm run docs:typedoc`) and dry-runs the publish: the request is validated, nothing is sent.
- **Pushes to `develop`, `release/**` and `main`:** job `publish-docs` in `.github/workflows/release.yml`, after
  its `build` job (lint + test), PUTs the version to `<DOCS_API_URL>/sources/node-errors/versions/<version>`, where
  `<version>` is `<version>-dev.<sha>` on `develop`, the `package.json` version on `main` and `release/**`.
- **Until the four settings below exist** it builds, validates and skips the send with a
  notice. Today that is every run: the docs host isn't deployed yet. It comes with the
  cloud launch, docs-platform-0 slice 17.

| Setting | Kind | Value |
|---|---|---|
| `DOCS_API_URL` | variable | the docs API base, e.g. `https://api.<env>.agrippa.io/docs/v1` |
| `DOCS_TOKEN_URL` | variable | the OIDC token endpoint (client credentials) |
| `DOCS_PUBLISH_CLIENT_ID` | variable | the publishing client's id (scope `docs:publish`) |
| `DOCS_PUBLISH_CLIENT_SECRET` | secret | that client's secret |

They are GitHub Actions organization variables and an organization secret. Slice 17 creates
them along with the docs host and its publishing client; there is nothing to set per repo.

### Publish to your local docs stack

A GitHub runner can't reach your `localhost`, so CI never hydrates a local docs stack. Do it
from the workspace root (`repos-agrippa/`, agrippa-stack `develop`), with this repo's
dependencies installed (`npm ci`): its build command runs first.

1. Start the stack: auth on :4200, authz on :4201, docs on :4370 (`… stack.sh down` stops it).

   ```bash
   STACK_AUTH_DIR=$PWD/services/node-auth-service STACK_AUTHZ_DIR=$PWD/services/node-service-authz STACK_DOCS_DIR=$PWD/services/node-service-docs github-actions/docs/actions/sdk-contract-stack/stack.sh up
   ```

2. Publish this repo:

   ```bash
   npm run docs:publish-local -- --repo packages/node-errors
   ```

3. Publish every wired repo:

   ```bash
   npm run docs:publish-local
   ```

4. Validate without sending: it builds and checks the request, needs no token and
   sends nothing. Leave out `--repo` to check every repo; add `--no-build` to skip the build when the
   documents are already built (a repo whose document isn't built then fails with `spec not found`).

   ```bash
   npm run docs:publish-local -- --repo packages/node-errors --dry-run
   npm run docs:publish-local -- --no-build --dry-run
   ```

5. Look at it. `curl http://localhost:4370/sources/node-errors` lists the versions;
   `…/versions/latest` has the ingest status, counts and diagnostics, and
   `…/versions/latest/exports` its exports.
   (The docs UI can't read this stack directly yet: node-service-docs sends no CORS
   headers, so a browser on :4504 is blocked.)

Local versions are `<version>-dev.<sha>` (plus `.local.<hash>` for uncommitted changes), so
they never collide with CI's. See [`docs-publish-local.mjs`](https://github.com/agrippa-io/agrippa-stack/blob/develop/deploy/scripts/README.md) for the options.
