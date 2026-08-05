import { count, desc, eq } from 'drizzle-orm'
import { UTC2Date } from '@lincy/utils'
import { useDb } from '../db'
import { articles } from '../db/schema'
import { buildPageResult, getOffset } from '../utils/pagination'

/**
 * 文章分页列表
 */
export function listArticles(page: number, pageSize: number) {
    const db = useDb()
    const offset = getOffset(page, pageSize)
    const total = db.select({ value: count() }).from(articles).get()?.value ?? 0
    const list = db
        .select()
        .from(articles)
        .orderBy(desc(articles.id))
        .limit(pageSize)
        .offset(offset)
        .all()
        .map(row => ({
            id: String(row.id),
            title: row.title,
            content: row.content,
            date: row.date,
            author: row.author,
            category: row.category,
            views: row.views,
        }))

    const totalPage = Math.ceil(total / pageSize)
    return buildPageResult({
        list,
        total,
        page,
        pageSize,
        extra: {
            hasprev: page > 1 ? 1 : 0,
            totalPage,
        },
    })
}

/**
 * 文章详情
 */
export function getArticleDetail(id: number) {
    const db = useDb()
    const row = db.select().from(articles).where(eq(articles.id, id)).get()
    if (!row) {
        return null
    }
    return {
        id: String(row.id),
        title: row.title,
        content: row.content,
        date: row.date,
        author: row.author,
        category: row.category,
        views: row.views,
    }
}

/**
 * 按浏览量推荐文章
 */
export function listArticleRelated() {
    const db = useDb()
    return db
        .select()
        .from(articles)
        .orderBy(desc(articles.views))
        .limit(10)
        .all()
        .map(row => ({
            id: String(row.id),
            title: row.title,
            content: row.content,
            date: row.date,
            author: row.author,
            category: row.category,
            views: row.views,
        }))
}

/**
 * 新增文章
 */
export function addArticle(input: { title: string, content: string, category: string, author?: string }) {
    const db = useDb()
    const date = UTC2Date('', 'yyyy-mm-dd hh:ii:ss')
    const row = db.insert(articles).values({
        title: input.title,
        content: input.content,
        author: input.author || '央视网',
        category: input.category,
        views: 0,
        date,
    }).returning().get()!

    return {
        result: {
            success: true,
            lastInsertRowid: row.id,
            changes: 1,
        },
        data: {
            id: String(row.id),
            title: row.title,
            content: row.content,
            date: row.date,
            author: row.author,
            category: row.category,
            views: row.views,
        },
    }
}

/**
 * 编辑文章
 */
export function editArticle(input: { id: number, title: string, content: string, category: string }) {
    const db = useDb()
    const date = UTC2Date('', 'yyyy-mm-dd hh:ii:ss')
    const result = db.update(articles).set({
        title: input.title,
        content: input.content,
        category: input.category,
        date,
    }).where(eq(articles.id, input.id)).run()

    return {
        success: true,
        lastInsertRowid: input.id,
        changes: result.changes,
    }
}
