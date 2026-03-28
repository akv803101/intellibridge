import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

// Next.js fails if public/_next exists from a prior static export copy. Wipe public before build.
const publicDir = join(process.cwd(), 'public')
if (existsSync(publicDir)) {
  rmSync(publicDir, { recursive: true, force: true })
}
mkdirSync(publicDir, { recursive: true })
