import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/** 新闻表 */
export const news = sqliteTable('news', {
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

export type News = typeof news.$inferSelect
export type NewNews = typeof news.$inferInsert
