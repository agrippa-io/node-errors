# @agrippa-io/node-errors

Typed error classes for Agrippa Node.js services. Every error extends
`ErrorAPI`, which carries an HTTP `status` and is mapped to an HTTP response
by the services' error-handling middleware.

## Usage

```ts
import { ErrorBadRequest, ErrorResourceNotFound } from '@agrippa-io/node-errors'

throw new ErrorResourceNotFound('User not found')
```

## Conventions

Follows the standard `node-service-template` TypeScript setup: CommonJS,
`strict` type-checking, `src/*` path aliases (rewritten by `tsc-alias` at
build), ESLint flat config (no semicolons), and Vitest.

## Scripts

```bash
npm run build       # tsc + tsc-alias -> dist/
npm test            # vitest
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
```
