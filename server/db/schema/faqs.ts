import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/** FAQ 表 */
export const faqs = sqliteTable('faqs', {
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

export type Faq = typeof faqs.$inferSelect
export type NewFaq = typeof faqs.$inferInsert
