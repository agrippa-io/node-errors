# Changelog

All notable changes to this library are recorded here. Follows
[Semantic Versioning](https://semver.org): consumers auto-merge patch and minor
updates, so anything that can break a caller is a major.

## [Unreleased]

Rewrite (shared-libs-1 SL-3). See "Migrating from 1.x" in the README.

### Breaking
- `ErrorAPI(message, status)` replaced by `HttpError(status, message, details?)`
  (argument order swapped).
- Classes renamed: `ErrorBadRequest` → `BadRequestError`, `ErrorUnauthorized` →
  `UnauthorizedError`, `ErrorForbidden` → `ForbiddenError`,
  `ErrorResourceNotFound` → `NotFoundError` (no message prefix),
  `ErrorResourceAlreadyExists` (400) → `ConflictError` (409).
- Removed the Mongoose- and app-specific errors, `ErrorServer`, and
  `MongooseCodes`.
- Constructors no longer log; the package no longer depends on
  `@agrippa-io/node-utils`.

### Added
- `ServiceUnavailableError` (503); optional `details` on every class.
- `/http` subpath export; 100% test coverage.

## 1.x

Published from the `development` branch (last: 1.0.10). No changelog was kept.
