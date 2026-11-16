import path from 'path'
import { defineConfig } from 'vitest/config'

// Libraries hold a 100% coverage gate: every consumer inherits their bugs.
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    clearMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/**/index.ts'],
      thresholds: { branches: 100, functions: 100, lines: 100, statements: 100 }
    }
  }
})
