import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { resolveDatabasePath } from '../config/database'
import * as schema from './schema'

let sqlite: Database.Database | null = null
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null

/**
 * 获取 Drizzle 数据库实例（单例）
 */
export function useDb(databaseUrl?: string) {
    if (dbInstance) {
        return dbInstance
    }
    const dbPath = resolveDatabasePath(databaseUrl)
    sqlite = new Database(dbPath)
    sqlite.pragma('journal_mode = WAL')
    sqlite.pragma('foreign_keys = ON')
    dbInstance = drizzle(sqlite, { schema })
    return dbInstance
}

/**
 * 获取底层 better-sqlite3 连接（用于建表等）
 */
export function useSqlite(databaseUrl?: string) {
    if (!sqlite) {
        useDb(databaseUrl)
    }
    return sqlite!
}

export type AppDatabase = ReturnType<typeof useDb>
export { schema }
