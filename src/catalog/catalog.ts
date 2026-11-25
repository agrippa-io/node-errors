import { HttpError } from 'src/http/http'

/** `format` of an exported catalog document. */
export const ERROR_CATALOG_FORMAT = 'agrippa.error-catalog'

/** Schema version of an exported catalog document. Bumped on a breaking shape change. */
export const ERROR_CATALOG_VERSION = 1

/**
 * Error codes are UPPER_SNAKE_CASE (`WIDGET_NOT_FOUND`). A code is a public,
 * stable identifier: clients branch on it, the docs link to it, so never reuse
 * or rename one.
 */
export const ERROR_CODE_PATTERN = /^[A-Z][A-Z0-9]*(_[A-Z0-9]+)*$/

/** One documented error: what a caller sees and what to do about it. */
export interface ErrorCatalogEntry<C extends string = string> {
  /** Stable UPPER_SNAKE_CASE code, unique within the catalog. */
  code: C
  /** HTTP status the error is returned with (400–599). */
  httpStatus: number
  /** Short human title, e.g. "Widget not found". */
  title: string
  /** What the error means: when it happens and why. */
  meaning: string
  /** What the caller should do about it. */
  remediation: string
  /** Whether retrying the same request unchanged can succeed. */
  retryable: boolean
}

/** What `defineErrorCatalog` takes. */
export interface ErrorCatalogDefinition<E extends ReadonlyArray<ErrorCatalogEntry>> {
  /** The service (or `platform`) that owns these codes, e.g. `catalog`. */
  service: string
  errors: E
}

/** The JSON a catalog exports (`errors.json`), sorted by code. */
export interface ErrorCatalogDocument {
  format: typeof ERROR_CATALOG_FORMAT
  version: typeof ERROR_CATALOG_VERSION
  service: string
  errors: ErrorCatalogEntry[]
}

/**
 * Thrown when a catalog definition or document is invalid. `problems` lists
 * every issue found, not just the first.
 */
export class ErrorCatalogDefinitionError extends Error {
  constructor(readonly problems: string[]) {
    super(`Invalid error catalog:\n  ${problems.join('\n  ')}`)
    this.name = 'ErrorCatalogDefinitionError'
  }
}

/**
 * An `HttpError` raised from a catalog entry. Carries the stable `code` so the
 * error handler and clients can branch on it, plus the entry's `title` and
 * `retryable`.
 */
export class CatalogError<C extends string = string> extends HttpError {
  readonly code: C
  readonly title: string
  readonly retryable: boolean

  constructor(entry: ErrorCatalogEntry<C>, message?: string, details?: unknown) {
    super(entry.httpStatus, message ?? entry.title, details)
    this.name = 'CatalogError'
    this.code = entry.code
    this.title = entry.title
    this.retryable = entry.retryable
  }
}

/** A validated, frozen error catalog. */
export interface ErrorCatalog<C extends string = string> {
  readonly service: string
  /** Entries in definition order. */
  readonly entries: ReadonlyArray<Readonly<ErrorCatalogEntry<C>>>
  /** Every code, in definition order. */
  readonly codes: ReadonlyArray<C>
  has(code: string): code is C
  /** The entry for `code`, or `undefined`. */
  get(code: string): Readonly<ErrorCatalogEntry<C>> | undefined
  /** A `CatalogError` for `code`; the message defaults to the entry's title. */
  error(code: C, message?: string, details?: unknown): CatalogError<C>
  /** The exportable document, sorted by code. `JSON.stringify(catalog)` uses it. */
  toJSON(): ErrorCatalogDocument
}

const TEXT_FIELDS = ['title', 'meaning', 'remediation'] as const

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function validateEntry(entry: unknown, index: number, seen: Set<string>, report: (p: string) => void): void {
  if (!isRecord(entry)) {
    report(`errors[${index}] is not an object`)
    return
  }
  const code = entry.code
  const label = typeof code === 'string' && code ? code : `errors[${index}]`
  if (typeof code !== 'string' || !ERROR_CODE_PATTERN.test(code)) {
    report(`${label}: code must be UPPER_SNAKE_CASE`)
  } else {
    if (seen.has(code)) report(`${code}: duplicate code`)
    seen.add(code)
  }
  const status = entry.httpStatus
  if (typeof status !== 'number' || !Number.isInteger(status) || status < 400 || status > 599) {
    report(`${label}: httpStatus must be an integer from 400 to 599`)
  }
  for (const field of TEXT_FIELDS) {
    const value = entry[field]
    if (typeof value !== 'string' || !value.trim()) report(`${label}: ${field} must be a non-empty string`)
  }
  if (typeof entry.retryable !== 'boolean') report(`${label}: retryable must be a boolean`)
}

function validateCatalog(service: unknown, errors: unknown, report: (p: string) => void): void {
  if (typeof service !== 'string' || !service.trim()) report('service must be a non-empty string')
  if (!Array.isArray(errors)) {
    report('errors must be an array')
    return
  }
  const seen = new Set<string>()
  errors.forEach((entry, index) => validateEntry(entry, index, seen, report))
}

function pick<C extends string>(entry: ErrorCatalogEntry<C>): ErrorCatalogEntry<C> {
  return Object.freeze({
    code: entry.code,
    httpStatus: entry.httpStatus,
    title: entry.title,
    meaning: entry.meaning,
    remediation: entry.remediation,
    retryable: entry.retryable
  })
}

/**
 * Declares a service's error codes. Validates every entry (UPPER_SNAKE_CASE
 * unique codes, 4xx/5xx status, non-empty title / meaning / remediation,
 * boolean retryable) and throws `ErrorCatalogDefinitionError` listing every
 * problem, so a bad catalog fails at startup and in tests.
 *
 * ```ts
 * export const errors = defineErrorCatalog({
 *   service: 'catalog',
 *   errors: [
 *     { code: 'PRODUCT_NOT_FOUND', httpStatus: 404, title: 'Product not found',
 *       meaning: 'No product has this id in the caller\'s organization.',
 *       remediation: 'Check the id; list products to find it.', retryable: false }
 *   ]
 * })
 * throw errors.error('PRODUCT_NOT_FOUND', `product ${id} not found`)
 * ```
 */
export function defineErrorCatalog<const E extends ReadonlyArray<ErrorCatalogEntry>>(
  definition: ErrorCatalogDefinition<E>
): ErrorCatalog<E[number]['code']> {
  type C = E[number]['code']
  const problems: string[] = []
  validateCatalog(definition.service, definition.errors, (p) => problems.push(p))
  if (problems.length) throw new ErrorCatalogDefinitionError(problems)

  const entries = Object.freeze(definition.errors.map((e) => pick(e as ErrorCatalogEntry<C>)))
  const byCode = new Map<string, Readonly<ErrorCatalogEntry<C>>>(entries.map((e) => [e.code, e]))
  const service = definition.service

  const catalog: ErrorCatalog<C> = {
    service,
    entries,
    codes: Object.freeze(entries.map((e) => e.code)),
    has: (code: string): code is C => byCode.has(code),
    get: (code) => byCode.get(code),
    error(code, message, details) {
      const entry = byCode.get(code)
      if (!entry) throw new Error(`Unknown error code ${code} in the ${service} catalog`)
      return new CatalogError(entry, message, details)
    },
    toJSON: () => ({
      format: ERROR_CATALOG_FORMAT,
      version: ERROR_CATALOG_VERSION,
      service,
      errors: [...entries].sort((a, b) => (a.code < b.code ? -1 : 1)).map((e) => ({ ...e }))
    })
  }
  return Object.freeze(catalog)
}

/**
 * Validates an exported catalog document (e.g. a fetched `errors.json`) and
 * returns it as a catalog. Throws `ErrorCatalogDefinitionError` listing every
 * problem: wrong `format`, unsupported `version`, or any bad entry.
 */
export function parseErrorCatalog(document: unknown): ErrorCatalog {
  if (!isRecord(document)) throw new ErrorCatalogDefinitionError(['document is not an object'])
  const problems: string[] = []
  if (document.format !== ERROR_CATALOG_FORMAT) problems.push(`format must be "${ERROR_CATALOG_FORMAT}"`)
  if (document.version !== ERROR_CATALOG_VERSION) problems.push(`version must be ${ERROR_CATALOG_VERSION}`)
  validateCatalog(document.service, document.errors, (p) => problems.push(p))
  if (problems.length) throw new ErrorCatalogDefinitionError(problems)
  return defineErrorCatalog({
    service: document.service as string,
    errors: document.errors as ErrorCatalogEntry[]
  })
}

/** True when `err` is a `CatalogError` (optionally with the given code). */
export function isCatalogError(err: unknown, code?: string): err is CatalogError {
  return err instanceof CatalogError && (code === undefined || err.code === code)
}
