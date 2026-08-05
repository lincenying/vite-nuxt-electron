import { asc } from 'drizzle-orm'
import { useDb } from '../db'
import { categories, products } from '../db/schema'
import {
    getContentDetail,
    getContentRelated,
    getProductList,
    getProductRecommend,
} from './content.service'

/**
 * 获取产品分类列表
 */
export function listCategories() {
    const db = useDb()
    return db.select({
        id: categories.id,
        title: categories.title,
    }).from(categories).orderBy(asc(categories.id)).all()
}

/**
 * 产品列表
 */
export function listProducts(page: number, pageSize: number, category?: string, tag?: string) {
    return getProductList({ page, pageSize, category, tag })
}

/**
 * 产品详情
 */
export function getProductDetail(id: number) {
    return getContentDetail(products, id)
}

/**
 * 产品推荐
 */
export function listProductRecommend() {
    return getProductRecommend(4)
}

/**
 * 产品相关推荐
 */
export function listProductRelated(categoryId?: number) {
    return getContentRelated(products, { categoryId, limit: 10 }).map(row => ({
        id: String(row.id),
        date: row.date,
        title: row.title,
    }))
}
