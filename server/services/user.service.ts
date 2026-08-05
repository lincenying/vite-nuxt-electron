import { eq } from 'drizzle-orm'
import { useDb } from '../db'
import { users } from '../db/schema'

/**
 * 登录校验，成功返回 token
 */
export function loginByPassword(name: string, password: string) {
    const db = useDb()
    const user = db.select().from(users).where(eq(users.name, name)).get()
    if (!user || user.password !== password) {
        return null
    }
    return {
        token: user.token || user.name,
    }
}

/**
 * 演示用户列表（兼容原 user 字段）
 */
export function listDemoUsers() {
    const db = useDb()
    return db.select({
        id: users.id,
        userid: users.userid,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
    }).from(users).all().map(row => ({
        id: String(row.id),
        userid: row.userid || '',
        firstName: row.firstName || '',
        lastName: row.lastName || '',
        email: row.email || '',
    }))
}

/**
 * 演示用户详情
 */
export function getDemoUserDetail(id: number) {
    const db = useDb()
    const row = db.select({
        id: users.id,
        userid: users.userid,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
    }).from(users).where(eq(users.id, id)).get()

    if (!row) {
        return null
    }

    return {
        id: String(row.id),
        userid: row.userid || '',
        firstName: row.firstName || '',
        lastName: row.lastName || '',
        email: row.email || '',
    }
}

/**
 * 新增演示用户
 */
export function addDemoUser(input: { firstName: string, lastName: string, email: string }) {
    const db = useDb()
    const userid = String(Math.round(Math.random() * 10_000))
    const name = `user_${userid}`
    const row = db.insert(users).values({
        name,
        password: '123456',
        nickName: `${input.firstName}${input.lastName}`,
        role: '普通用户',
        isAdmin: 0,
        token: name,
        userid,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
    }).returning({
        id: users.id,
        userid: users.userid,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
    }).get()!

    return {
        result: {
            success: true,
            lastInsertRowid: row.id,
            changes: 1,
        },
        data: {
            id: String(row.id),
            userid: row.userid || '',
            firstName: row.firstName || '',
            lastName: row.lastName || '',
            email: row.email || '',
        },
    }
}
