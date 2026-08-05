import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/** 产品分类表 */
export const categories = sqliteTable('categories', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
})

export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
