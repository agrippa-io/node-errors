import fs from 'fs'
import os from 'os'
import path from 'path'
import { defineErrorCatalog, parseErrorCatalog, platformErrorCatalog } from 'src/catalog'
import * as root from 'src/index'

// The publish path end to end: a service writes errors.json next to its
// openapi.json, the docs service reads the file back and parses it.
describe('errors.json on disk', () => {
  let dir: string
  beforeEach(() => { dir = fs.mkdtempSync(path.join(os.tmpdir(), 'error-catalog-')) })
  afterEach(() => { fs.rmSync(dir, { recursive: true, force: true }) })

  it('writes a catalog and reads it back unchanged', () => {
    const catalog = defineErrorCatalog({
      service: 'billing',
      errors: [{
        code: 'INVOICE_FINALIZED', httpStatus: 409, title: 'Invoice finalized',
        meaning: 'A finalized invoice cannot change.', remediation: 'Issue a credit note.', retryable: false
      }]
    })
    const file = path.join(dir, 'errors.json')
    fs.writeFileSync(file, JSON.stringify(catalog, null, 2))
    const parsed = parseErrorCatalog(JSON.parse(fs.readFileSync(file, 'utf8')))
    expect(parsed.toJSON()).toEqual(catalog.toJSON())
    expect(parsed.error('INVOICE_FINALIZED').status).toBe(409)
  })

  it('round-trips the platform catalog', () => {
    const file = path.join(dir, 'platform-errors.json')
    fs.writeFileSync(file, JSON.stringify(platformErrorCatalog))
    expect(parseErrorCatalog(JSON.parse(fs.readFileSync(file, 'utf8'))).codes)
      .toEqual([...platformErrorCatalog.codes].sort())
  })
})

describe('root entry', () => {
  it('re-exports the catalog and http modules', () => {
    expect(root.defineErrorCatalog).toBe(defineErrorCatalog)
    expect(root.platformErrorCatalog).toBe(platformErrorCatalog)
    expect(typeof root.HttpError).toBe('function')
  })
})
