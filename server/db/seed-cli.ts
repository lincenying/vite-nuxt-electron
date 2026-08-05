import { ensureSchema, seedIfEmpty } from './seed'

/**
 * CLI 入口：确保建表并填充种子数据
 * 使用 --force 可清空后重新填充
 */
ensureSchema()
const result = seedIfEmpty({ force: process.argv.includes('--force') })
console.log(result.seeded ? '种子数据已写入' : '数据库已有数据，跳过种子填充（可用 --force 强制重写）')
