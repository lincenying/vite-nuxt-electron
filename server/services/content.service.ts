import { and, count, desc, eq, like } from 'drizzle-orm'
import { useDb } from '../db'
import { cases, faqs, news, products } from '../db/schema'
import { buildPageResult, getOffset } from '../utils/pagination'

export interface ContentDetail {
    id: number
    title: string
    author: string
    date: string
    category: string
    category_id: number
    intro: string
    content: string
    imgUrl: string
    views: number
}

type ContentRow = {
    id: number
    title: string
    author: string
    date: string
    category: string
    categoryId: number
    intro: string
    content: string
    imgUrl: string
    views: number
}

/**
 * 将数据库行映射为详情响应
 */
export function toContentDetail(row: ContentRow): ContentDetail {
    return {
        id: row.id,
        title: row.title,
        author: row.author,
        date: row.date,
        category: row.category,
        category_id: row.categoryId,
        intro: row.intro,
        content: row.content,
        imgUrl: row.imgUrl,
        views: row.views,
    }
}

type ContentTable = typeof news | typeof cases | typeof faqs | typeof products

/**
 * 按 id 获取详情
 */
export function getContentDetail(table: ContentTable, id: number): ContentDetail | null {
    const db = useDb()
    const row = db.select().from(table).where(eq(table.id, id)).get() as ContentRow | undefined
    if (!row) {
        return null
    }
    return toContentDetail(row)
}

/**
 * 侧栏推荐（按浏览量）
 */
export function getContentRecommend(table: ContentTable, limit = 4) {
    const db = useDb()
    return db
        .select({
            id: table.id,
            date: table.date,
            title: table.title,
        })
        .from(table)
        .orderBy(desc(table.views))
        .limit(limit)
        .all()
}

/**
 * 相关推荐
 */
export function getContentRelated(table: ContentTable, options: { categoryId?: number, limit?: number } = {}) {
    const db = useDb()
    const limit = options.limit ?? 10
    if (options.categoryId) {
        return db
            .select({
                id: table.id,
                date: table.date,
                title: table.title,
            })
            .from(table)
            .where(eq(table.categoryId, options.categoryId))
            .orderBy(desc(table.views))
            .limit(limit)
            .all()
    }
    return db
        .select({
            id: table.id,
            date: table.date,
            title: table.title,
        })
        .from(table)
        .orderBy(desc(table.date), desc(table.id))
        .limit(limit)
        .all()
}

/**
 * 简单列表（news / faqs）
 */
export function getSimpleContentList(table: typeof news | typeof faqs, page: number, pageSize: number) {
    const db = useDb()
    const offset = getOffset(page, pageSize)
    const total = db.select({ value: count() }).from(table).get()?.value ?? 0
    const list = db
        .select({
            id: table.id,
            title: table.title,
            date: table.date,
            intro: table.intro,
        })
        .from(table)
        .orderBy(desc(table.id))
        .limit(pageSize)
        .offset(offset)
        .all()
    return buildPageResult({ list, total, page, pageSize })
}

/**
 * 带封面列表（cases）
 */
export function getCoverContentList(table: typeof cases, page: number, pageSize: number) {
    const db = useDb()
    const offset = getOffset(page, pageSize)
    const total = db.select({ value: count() }).from(table).get()?.value ?? 0
    const list = db
        .select({
            id: table.id,
            imgUrl: table.imgUrl,
            title: table.title,
            date: table.date,
            intro: table.intro,
        })
        .from(table)
        .orderBy(desc(table.id))
        .limit(pageSize)
        .offset(offset)
        .all()
    return buildPageResult({ list, total, page, pageSize })
}

/**
 * 产品列表（支持分类 / 标签筛选）
 */
export function getProductList(options: {
    page: number
    pageSize: number
    category?: string
    tag?: string
}) {
    const db = useDb()
    const { page, pageSize, category, tag } = options
    const offset = getOffset(page, pageSize)

    const conditions = []
    if (category) {
        const categoryId = Number(category)
        if (!Number.isNaN(categoryId) && categoryId > 0) {
            conditions.push(eq(products.categoryId, categoryId))
        }
        else {
            conditions.push(eq(products.category, category))
        }
    }
    if (tag) {
        conditions.push(like(products.tags, `%${tag}%`))
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const totalQuery = db.select({ value: count() }).from(products)
    const total = (whereClause ? totalQuery.where(whereClause) : totalQuery).get()?.value ?? 0

    const listQuery = db
        .select({
            id: products.id,
            category: products.category,
            categoryId: products.categoryId,
            imgUrl: products.imgUrl,
            title: products.title,
            date: products.date,
            tags: products.tags,
        })
        .from(products)
        .orderBy(desc(products.id))
        .limit(pageSize)
        .offset(offset)

    const rows = (whereClause ? listQuery.where(whereClause) : listQuery).all()

    const list = rows.map(row => ({
        id: String(row.id),
        category: row.category,
        category_id: row.categoryId,
        imgUrl: row.imgUrl,
        title: row.title,
        date: row.date,
        tag: JSON.parse(row.tags || '[]') as string[],
    }))

    return buildPageResult({ list, total, page, pageSize })
}

/**
 * 产品侧栏推荐（含封面图）
 */
export function getProductRecommend(limit = 4) {
    const db = useDb()
    return db
        .select({
            id: products.id,
            imgUrl: products.imgUrl,
            title: products.title,
        })
        .from(products)
        .orderBy(desc(products.views))
        .limit(limit)
        .all()
        .map(row => ({
            id: String(row.id),
            imgUrl: row.imgUrl,
            title: row.title,
        }))
}
