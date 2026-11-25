import { defineErrorCatalog } from 'src/catalog/catalog'

/**
 * Errors any platform operation can return, whatever the service: they come
 * from the shared middleware (`@agrippa-io/node-http` validation, rate limit,
 * error handler; `@agrippa-io/node-authz-client` enforcement) rather than from
 * a route. The docs service attaches them to every operation by status, so a
 * service catalog declares only its domain codes.
 */
export const platformErrorCatalog = defineErrorCatalog({
  service: 'platform',
  errors: [
    {
      code: 'BAD_REQUEST',
      httpStatus: 400,
      title: 'Bad request',
      meaning: 'The request could not be read: malformed JSON, a body that is too large, or a parameter of the wrong shape.',
      remediation: 'Fix the request so it is valid JSON within the size limit and matches the documented shape, then send it again.',
      retryable: false
    },
    {
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
      title: 'Validation failed',
      meaning: 'The body, path parameters or query string did not match the operation\'s schema. `details` lists each field that failed.',
      remediation: 'Correct the fields named in `details` and send the request again.',
      retryable: false
    },
    {
      code: 'UNAUTHORIZED',
      httpStatus: 401,
      title: 'Unauthorized',
      meaning: 'The request has no valid credentials: the token is missing, malformed, expired or revoked.',
      remediation: 'Sign in again or refresh the access token, then retry with a valid `Authorization` header.',
      retryable: false
    },
    {
      code: 'FORBIDDEN',
      httpStatus: 403,
      title: 'Forbidden',
      meaning: 'The caller is authenticated but lacks the permission or scope this operation needs on the target resource.',
      remediation: 'Ask an administrator of the organization for the required role, or use a token issued with the required scope.',
      retryable: false
    },
    {
      code: 'NOT_FOUND',
      httpStatus: 404,
      title: 'Not found',
      meaning: 'No route matches the path, or the resource does not exist or is not visible to the caller.',
      remediation: 'Check the path and the resource id, and that the resource belongs to the caller\'s organization.',
      retryable: false
    },
    {
      code: 'CONFLICT',
      httpStatus: 409,
      title: 'Conflict',
      meaning: 'The request conflicts with the current state of the resource, e.g. a duplicate key or a stale version.',
      remediation: 'Fetch the current state of the resource, resolve the conflict, then send the request again.',
      retryable: false
    },
    {
      code: 'UNPROCESSABLE_ENTITY',
      httpStatus: 422,
      title: 'Unprocessable entity',
      meaning: 'The request is well formed but breaks a business rule, so it cannot be applied.',
      remediation: 'Read the message and `details` for the rule that failed and change the request to satisfy it.',
      retryable: false
    },
    {
      code: 'RATE_LIMITED',
      httpStatus: 429,
      title: 'Too many requests',
      meaning: 'The caller sent more requests than the rate limit allows in the current window.',
      remediation: 'Wait for the window to reset (see the `RateLimit-*` / `Retry-After` headers) and retry with backoff.',
      retryable: true
    },
    {
      code: 'INTERNAL_ERROR',
      httpStatus: 500,
      title: 'Internal server error',
      meaning: 'The service hit an unexpected error. It has been logged; the response carries no detail.',
      remediation: 'Retry with backoff. If it persists, contact support with the request id from the `x-request-id` header.',
      retryable: true
    },
    {
      code: 'SERVICE_UNAVAILABLE',
      httpStatus: 503,
      title: 'Service unavailable',
      meaning: 'The service or one of its dependencies is temporarily down, starting, or shedding load.',
      remediation: 'Retry with exponential backoff.',
      retryable: true
    }
  ]
})

/** A platform error code. */
export type PlatformErrorCode = typeof platformErrorCatalog.codes[number]
