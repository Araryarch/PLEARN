import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/',
      'build/',
      'dist/',
      '.next/',
      'coverage/',
      '.env',
      '.env.*',
      '.cache/',
      '.npm/',
      '*.log',
      '.idea/',
      '.vscode/',
      '*.swp',
      '*.swo',
      'android/',
      'ios/',
      '.android/',
    ],
  },
]

export default eslintConfig
