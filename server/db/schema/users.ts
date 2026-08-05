import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/** 用户表（登录 + sqlite3 演示合并） */
export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull().unique(),
    password: text('password').notNull().default(''),
    nickName: text('nick_name').notNull().default(''),
    role: text('role').notNull().default(''),
    isAdmin: integer('is_admin').notNull().default(0),
    token: text('token').notNull().default(''),
    userid: text('userid'),
    firstName: text('first_name'),
    lastName: text('last_name'),
    email: text('email'),
})

export type UserRow = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
