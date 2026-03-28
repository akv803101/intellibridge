import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const publicDir = join(root, 'public')
const outDir = join(root, 'out')
const cmd = process.argv[2]

if (cmd === 'clean-public') {
  if (existsSync(publicDir)) rmSync(publicDir, { recursive: true, force: true })
  mkdirSync(publicDir, { recursive: true })
} else if (cmd === 'sync-out') {
  if (!existsSync(outDir)) {
    console.error('vercel-static: missing out/ — run next build first')
    process.exit(1)
  }
  rmSync(publicDir, { recursive: true, force: true })
  mkdirSync(publicDir, { recursive: true })
  cpSync(outDir, publicDir, { recursive: true })
  console.log('vercel-static: synced out/ → public/')
} else {
  console.error('Usage: node scripts/vercel-static.mjs clean-public|sync-out')
  process.exit(1)
}
