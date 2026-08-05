import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/** 评论内容类型 */
export type CommentContentType = 'product' | 'case' | 'news' | 'faq' | 'article'

/** 评论表（多态关联） */
export const comments = sqliteTable('comments', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    contentType: text('content_type').notNull().$type<CommentContentType>(),
    contentId: integer('content_id').notNull(),
    parentId: integer('parent_id'),
    userName: text('user_name').notNull(),
    avatar: text('avatar').notNull(),
    date: text('date').notNull(),
    body: text('body').notNull(),
})

export type CommentRow = typeof comments.$inferSelect
export type NewComment = typeof comments.$inferInsert
