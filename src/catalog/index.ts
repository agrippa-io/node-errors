export {
  ERROR_CATALOG_FORMAT,
  ERROR_CATALOG_VERSION,
  ERROR_CODE_PATTERN,
  CatalogError,
  ErrorCatalogDefinitionError,
  defineErrorCatalog,
  parseErrorCatalog,
  isCatalogError
} from 'src/catalog/catalog'
export type {
  ErrorCatalog,
  ErrorCatalogDefinition,
  ErrorCatalogDocument,
  ErrorCatalogEntry
} from 'src/catalog/catalog'
export { platformErrorCatalog } from 'src/catalog/platform'
export type { PlatformErrorCode } from 'src/catalog/platform'
