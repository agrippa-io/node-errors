import { HttpError } from 'src/http'
import {
  CatalogError,
  ERROR_CATALOG_FORMAT,
  ERROR_CATALOG_VERSION,
  ErrorCatalogDefinitionError,
  defineErrorCatalog,
  isCatalogError,
  parseErrorCatalog,
  platformErrorCatalog
} from 'src/catalog'
import type { ErrorCatalogEntry } from 'src/catalog'

const productNotFound = {
  code: 'PRODUCT_NOT_FOUND',
  httpStatus: 404,
  title: 'Product not found',
  meaning: 'No product has this id.',
  remediation: 'Check the id.',
  retryable: false
} as const

const priceLocked = {
  code: 'PRICE_LOCKED',
  httpStatus: 409,
  title: 'Price locked',
  meaning: 'The price is in use by an active subscription.',
  remediation: 'Create a new price instead.',
  retryable: false
} as const

const define = () => defineErrorCatalog({ service: 'catalog', errors: [productNotFound, priceLocked] })

function problemsOf(fn: () => unknown): string[] {
  try {
    fn()
  } catch (err) {
    expect(err).toBeInstanceOf(ErrorCatalogDefinitionError)
    expect((err as Error).name).toBe('ErrorCatalogDefinitionError')
    return (err as ErrorCatalogDefinitionError).problems
  }
  throw new Error('expected an ErrorCatalogDefinitionError')
}

describe('defineErrorCatalog', () => {
  it('exposes service, entries, codes and lookups', () => {
    const catalog = define()
    expect(catalog.service).toBe('catalog')
    expect(catalog.codes).toEqual(['PRODUCT_NOT_FOUND', 'PRICE_LOCKED'])
    expect(catalog.entries).toEqual([productNotFound, priceLocked])
    expect(catalog.has('PRICE_LOCKED')).toBe(true)
    expect(catalog.has('NOPE')).toBe(false)
    expect(catalog.get('PRODUCT_NOT_FOUND')).toEqual(productNotFound)
    expect(catalog.get('NOPE')).toBeUndefined()
  })

  it('freezes the catalog and copies entries, dropping unknown fields', () => {
    const source = { ...productNotFound, extra: 'x' } as ErrorCatalogEntry & { extra: string }
    const catalog = defineErrorCatalog({ service: 's', errors: [source] })
    source.title = 'changed'
    expect(catalog.get('PRODUCT_NOT_FOUND')?.title).toBe('Product not found')
    expect(catalog.get('PRODUCT_NOT_FOUND')).not.toHaveProperty('extra')
    expect(Object.isFrozen(catalog)).toBe(true)
    expect(Object.isFrozen(catalog.entries)).toBe(true)
    expect(Object.isFrozen(catalog.entries[0])).toBe(true)
    expect(Object.isFrozen(catalog.codes)).toBe(true)
  })

  it('accepts an empty catalog', () => {
    const catalog = defineErrorCatalog({ service: 'empty', errors: [] })
    expect(catalog.codes).toEqual([])
    expect(catalog.toJSON().errors).toEqual([])
  })

  it('reports every problem at once', () => {
    const problems = problemsOf(() => defineErrorCatalog({
      service: ' ',
      errors: [
        { code: 'bad-code', httpStatus: 200, title: '', meaning: ' ', remediation: 'x', retryable: 'no' as unknown as boolean },
        productNotFound,
        productNotFound,
        { code: 'TOO_HIGH', httpStatus: 600, title: 't', meaning: 'm', remediation: 'r', retryable: true },
        { code: 'FRACTIONAL', httpStatus: 404.5, title: 't', meaning: 'm', remediation: 'r', retryable: true },
        { httpStatus: '404' as unknown as number, title: 't', meaning: 'm', remediation: 'r', retryable: true } as ErrorCatalogEntry,
        null as unknown as ErrorCatalogEntry
      ]
    }))
    expect(problems).toEqual([
      'service must be a non-empty string',
      'bad-code: code must be UPPER_SNAKE_CASE',
      'bad-code: httpStatus must be an integer from 400 to 599',
      'bad-code: title must be a non-empty string',
      'bad-code: meaning must be a non-empty string',
      'bad-code: retryable must be a boolean',
      'PRODUCT_NOT_FOUND: duplicate code',
      'TOO_HIGH: httpStatus must be an integer from 400 to 599',
      'FRACTIONAL: httpStatus must be an integer from 400 to 599',
      'errors[5]: code must be UPPER_SNAKE_CASE',
      'errors[5]: httpStatus must be an integer from 400 to 599',
      'errors[6] is not an object'
    ])
  })

  it('rejects a non-array errors list and a missing service', () => {
    const problems = problemsOf(() => defineErrorCatalog({
      service: undefined as unknown as string,
      errors: 'nope' as unknown as ErrorCatalogEntry[]
    }))
    expect(problems).toEqual(['service must be a non-empty string', 'errors must be an array'])
  })

  it('formats the message with one problem per line', () => {
    const err = new ErrorCatalogDefinitionError(['a', 'b'])
    expect(err.message).toBe('Invalid error catalog:\n  a\n  b')
  })

  it.each(['A', 'A1', 'WIDGET_NOT_FOUND', 'V2_LIMIT'])('accepts code %s', (code) => {
    expect(defineErrorCatalog({ service: 's', errors: [{ ...productNotFound, code }] }).has(code)).toBe(true)
  })

  it.each(['', 'a', '1A', 'A__B', 'A_', '_A', 'A-B', 'A.B'])('rejects code %j', (code) => {
    expect(() => defineErrorCatalog({ service: 's', errors: [{ ...productNotFound, code }] }))
      .toThrow(ErrorCatalogDefinitionError)
  })
})

describe('catalog.error', () => {
  it('builds a CatalogError that is an HttpError with the entry status and code', () => {
    const err = define().error('PRODUCT_NOT_FOUND', 'product p1 not found', { id: 'p1' })
    expect(err).toBeInstanceOf(CatalogError)
    expect(err).toBeInstanceOf(HttpError)
    expect(err).toBeInstanceOf(Error)
    expect(err.name).toBe('CatalogError')
    expect(err.status).toBe(404)
    expect(err.code).toBe('PRODUCT_NOT_FOUND')
    expect(err.title).toBe('Product not found')
    expect(err.retryable).toBe(false)
    expect(err.message).toBe('product p1 not found')
    expect(err.details).toEqual({ id: 'p1' })
  })

  it('defaults the message to the title', () => {
    const err = define().error('PRICE_LOCKED')
    expect(err.message).toBe('Price locked')
    expect(err.details).toBeUndefined()
  })

  it('throws on a code outside the catalog', () => {
    expect(() => define().error('NOPE' as 'PRICE_LOCKED')).toThrow('Unknown error code NOPE in the catalog catalog')
  })
})

describe('isCatalogError', () => {
  const err = define().error('PRICE_LOCKED')
  it('matches CatalogErrors, optionally by code', () => {
    expect(isCatalogError(err)).toBe(true)
    expect(isCatalogError(err, 'PRICE_LOCKED')).toBe(true)
    expect(isCatalogError(err, 'PRODUCT_NOT_FOUND')).toBe(false)
  })
  it('rejects other errors and values', () => {
    expect(isCatalogError(new HttpError(409, 'x'))).toBe(false)
    expect(isCatalogError(undefined)).toBe(false)
  })
})

describe('JSON export', () => {
  it('exports a versioned document sorted by code', () => {
    const doc = define().toJSON()
    expect(doc).toEqual({
      format: ERROR_CATALOG_FORMAT,
      version: ERROR_CATALOG_VERSION,
      service: 'catalog',
      errors: [priceLocked, productNotFound]
    })
    expect(ERROR_CATALOG_FORMAT).toBe('agrippa.error-catalog')
    expect(ERROR_CATALOG_VERSION).toBe(1)
  })

  it('is what JSON.stringify writes, and the export is a mutable copy', () => {
    const catalog = define()
    expect(JSON.parse(JSON.stringify(catalog))).toEqual(catalog.toJSON())
    const doc = catalog.toJSON()
    doc.errors[0]!.title = 'changed'
    expect(catalog.get(doc.errors[0]!.code)?.title).not.toBe('changed')
  })

  it('round-trips through parseErrorCatalog', () => {
    const catalog = define()
    const parsed = parseErrorCatalog(JSON.parse(JSON.stringify(catalog)))
    expect(parsed.service).toBe('catalog')
    expect(parsed.toJSON()).toEqual(catalog.toJSON())
    expect(parsed.error('PRICE_LOCKED').status).toBe(409)
  })
})

describe('parseErrorCatalog', () => {
  const valid = () => JSON.parse(JSON.stringify(define()))

  it.each([null, [], 'x', 3])('rejects a non-object document %j', (doc) => {
    expect(problemsOf(() => parseErrorCatalog(doc))).toEqual(['document is not an object'])
  })

  it('rejects the wrong format and version alongside bad entries', () => {
    const doc = { ...valid(), format: 'openapi', version: 2 }
    doc.errors[0].retryable = 'yes'
    expect(problemsOf(() => parseErrorCatalog(doc))).toEqual([
      'format must be "agrippa.error-catalog"',
      'version must be 1',
      'PRICE_LOCKED: retryable must be a boolean'
    ])
  })

  it('rejects a document without errors or service', () => {
    expect(problemsOf(() => parseErrorCatalog({ format: ERROR_CATALOG_FORMAT, version: 1 }))).toEqual([
      'service must be a non-empty string',
      'errors must be an array'
    ])
  })
})

describe('platformErrorCatalog', () => {
  it('covers the platform statuses every operation can return', () => {
    expect(platformErrorCatalog.service).toBe('platform')
    const statuses = new Set(platformErrorCatalog.entries.map((e) => e.httpStatus))
    for (const status of [400, 401, 403, 404, 409, 422, 429, 500, 503]) expect(statuses.has(status)).toBe(true)
  })

  it('marks only transient errors retryable', () => {
    const retryable = platformErrorCatalog.entries.filter((e) => e.retryable).map((e) => e.code)
    expect(retryable).toEqual(['RATE_LIMITED', 'INTERNAL_ERROR', 'SERVICE_UNAVAILABLE'])
  })

  it('matches the status node-http answers with', () => {
    expect(platformErrorCatalog.error('VALIDATION_FAILED').status).toBe(400)
    expect(platformErrorCatalog.error('RATE_LIMITED').status).toBe(429)
    expect(platformErrorCatalog.error('UNAUTHORIZED').status).toBe(401)
  })
})
