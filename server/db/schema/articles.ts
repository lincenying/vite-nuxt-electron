import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/** SQLite 演示文章表 */
export const articles = sqliteTable('articles', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    content: text('content').notNull(),
    author: text('author').notNull(),
    category: text('category').notNull(),
    views: integer('views').notNull().default(0),
    date: text('date').notNull(),
})

export type ArticleRow = typeof articles.$inferSelect
export type NewArticle = typeof articles.$inferInsert
