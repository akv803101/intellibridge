import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const outDir = join(root, 'out')
const publicDir = join(root, 'public')

if (!existsSync(outDir)) {
  console.error('export-to-public: missing out/ — run next build with output: "export" in next.config')
  process.exit(1)
}

rmSync(publicDir, { recursive: true, force: true })
mkdirSync(publicDir, { recursive: true })
cpSync(outDir, publicDir, { recursive: true })
console.log('export-to-public: copied out/ → public/')
