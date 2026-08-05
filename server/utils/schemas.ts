import { z } from 'zod'

/** 将空字符串转为 undefined，便于可选查询参数 */
function emptyToUndefined(value: unknown) {
    if (value === '' || value === null || value === undefined) {
        return undefined
    }
    return value
}

/** 通用分页查询参数 */
export const listPageSchema = z.object({
    page: z.preprocess(emptyToUndefined, z.coerce.number().int().min(1).default(1)),
    pageSize: z.preprocess(emptyToUndefined, z.coerce.number().int().min(1).max(100).default(12)),
})

/** 产品列表查询（支持分类/标签筛选） */
export const productListSchema = listPageSchema.extend({
    category: z.preprocess(emptyToUndefined, z.string().optional()),
    tag: z.preprocess(emptyToUndefined, z.string().optional()),
})

/** 详情 id 查询 */
export const idQuerySchema = z.object({
    id: z.coerce.number().int().positive(),
})

/** 相关推荐查询 */
export const relatedQuerySchema = z.object({
    categoryId: z.preprocess(emptyToUndefined, z.coerce.number().int().positive().optional()),
})

/** 评论列表查询 */
export const commentListSchema = z.object({
    page: z.preprocess(emptyToUndefined, z.coerce.number().int().min(1).default(1)),
    pageSize: z.preprocess(emptyToUndefined, z.coerce.number().int().min(1).max(100).default(10)),
    id: z.coerce.number().int().positive(),
    type: z.enum(['product', 'case', 'news', 'faq', 'article']),
})

/** 发布评论 */
export const commentPostSchema = z.object({
    comment_type: z.enum(['product', 'case', 'news', 'faq', 'article']),
    comment_id: z.coerce.number().int().positive(),
    user: z.string().min(1),
    content: z.string().min(1),
})

/** 登录 */
export const loginSchema = z.object({
    name: z.string().min(1),
    password: z.string().min(1),
})

/** 新增文章 */
export const articleAddSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    category: z.string().min(1),
    author: z.string().optional(),
})

/** 编辑文章 */
export const articleEditSchema = z.object({
    id: z.coerce.number().int().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    category: z.string().min(1),
})

/** 新增演示用户 */
export const demoUserAddSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
})
