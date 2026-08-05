import { existsSync, mkdirSync } from 'node:fs'
import { dirname, isAbsolute, resolve } from 'node:path'
import process from 'node:process'

/**
 * 解析 SQLite 数据库文件绝对路径
 * 支持 `file:.data/app.db` 或直接路径 `.data/app.db`
 */
export function resolveDatabasePath(databaseUrl?: string): string {
    const raw = databaseUrl || process.env.NUXT_DATABASE_URL || 'file:.data/app.db'
    const pathPart = raw.startsWith('file:') ? raw.slice('file:'.length) : raw
    const absolutePath = isAbsolute(pathPart) ? pathPart : resolve(process.cwd(), pathPart)
    const dir = dirname(absolutePath)
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true })
    }
    return absolutePath
}
