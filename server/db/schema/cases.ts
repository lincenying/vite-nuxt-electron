import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/** 案例表 */
export const cases = sqliteTable('cases', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    author: text('author').notNull(),
    date: text('date').notNull(),
    category: text('category').notNull(),
    categoryId: integer('category_id').notNull().default(0),
    intro: text('intro').notNull(),
    content: text('content').notNull(),
    imgUrl: text('img_url').notNull(),
    views: integer('views').notNull().default(0),
})

export type Case = typeof cases.$inferSelect
export type NewCase = typeof cases.$inferInsert
