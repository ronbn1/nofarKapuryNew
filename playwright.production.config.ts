import { defineConfig } from '@playwright/test'
import { existsSync } from 'node:fs'
import base from './playwright.config'

export default defineConfig({
  ...base,
  testMatch: '**/*.spec.ts',
  testIgnore: [],
  use: { ...base.use, baseURL: 'http://127.0.0.1:4173' },
  webServer: {
    command: existsSync('.tools/node_modules/node/bin/node.exe')
      ? '.\\npm-local.cmd run preview -- --host 127.0.0.1 --port 4173 --strictPort'
      : 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
  },
})
