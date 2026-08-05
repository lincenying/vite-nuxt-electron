import { ensureSchema, seedIfEmpty } from '../db/seed'

/**
 * 服务启动时初始化数据库 schema，并在空库时填充种子数据
 */
export default defineNitroPlugin(() => {
    ensureSchema()
    const result = seedIfEmpty()
    if (result.seeded) {
        console.log('[db-init] 已自动填充种子数据')
    }
})
