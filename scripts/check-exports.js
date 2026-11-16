/* eslint-disable no-console */
// Fails the build when a package.json `exports` / `typesVersions` target is
// missing from dist/, or when a dist file still contains an unrewritten
// `src/...` import (tsc-alias did not run). Catches broken subpaths before
// they reach consumers.
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const missing = []

const targets = []
for (const [key, value] of Object.entries(pkg.exports ?? {})) {
  if (key === './package.json') continue
  if (typeof value === 'string') targets.push(value)
  else targets.push(...Object.values(value))
}
for (const map of Object.values(pkg.typesVersions ?? {})) {
  for (const list of Object.values(map)) targets.push(...list)
}
targets.push(pkg.main, pkg.types)

for (const t of new Set(targets.filter(Boolean))) {
  if (!fs.existsSync(path.join(root, t))) missing.push(t)
}

const unrewritten = []
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p)
    else if (/\.(js|d\.ts)$/.test(entry.name) && /(require\(|from )['"]src\//.test(fs.readFileSync(p, 'utf8'))) {
      unrewritten.push(path.relative(root, p))
    }
  }
}
walk(path.join(root, 'dist'))

if (missing.length || unrewritten.length) {
  if (missing.length) console.error('exports/typesVersions targets missing from dist:\n  ' + missing.join('\n  '))
  if (unrewritten.length) console.error('dist files with unrewritten src/ imports:\n  ' + unrewritten.join('\n  '))
  process.exit(1)
}
console.log(`check-exports: ${new Set(targets).size} targets present, no unrewritten imports`)
