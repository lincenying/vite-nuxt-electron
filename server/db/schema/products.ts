import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { categories } from './categories'

/** 产品（home）表 */
export const products = sqliteTable('products', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    author: text('author').notNull(),
    date: text('date').notNull(),
    category: text('category').notNull(),
    categoryId: integer('category_id').notNull().references(() => categories.id),
    intro: text('intro').notNull(),
    content: text('content').notNull(),
    imgUrl: text('img_url').notNull(),
    views: integer('views').notNull().default(0),
    tags: text('tags').notNull().default('[]'),
})

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
