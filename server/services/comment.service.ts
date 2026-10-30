import type { CommentContentType } from '../db/schema'
import { UTC2Date } from '@lincy/utils'
import { and, asc, count, desc, eq, isNull } from 'drizzle-orm'
import { useDb } from '../db'
import { comments } from '../db/schema'
import { buildPageResult, getOffset } from '../utils/pagination'

const DEFAULT_AVATAR = 'https://cravatar.cn/avatar/f7043d902c520089b324569ba690ea91?s=80&d=identicon&r=g'

/**
 * 分页获取评论树（仅一层子评论）
 */
export function listComments(options: {
    page: number
    pageSize: number
    contentId: number
    contentType: CommentContentType
}) {
    const db = useDb()
    const { page, pageSize, contentId, contentType } = options
    const offset = getOffset(page, pageSize)

    const parentWhere = and(
        eq(comments.contentType, contentType),
        eq(comments.contentId, contentId),
        isNull(comments.parentId),
    )

    const total = db.select({ value: count() }).from(comments).where(parentWhere).get()?.value ?? 0

    const parents = db
        .select()
        .from(comments)
        .where(parentWhere)
        .orderBy(desc(comments.id))
        .limit(pageSize)
        .offset(offset)
        .all()

    const list = parents.map((parent) => {
        const children = db
            .select()
            .from(comments)
            .where(eq(comments.parentId, parent.id))
            .orderBy(asc(comments.id))
            .all()
            .map(child => ({
                id: child.id,
                article: child.contentId,
                user: { name: child.userName, avatar: child.avatar },
                date: child.date,
                content: child.body,
            }))

        return {
            id: parent.id,
            article: parent.contentId,
            user: { name: parent.userName, avatar: parent.avatar },
            date: parent.date,
            content: parent.body,
            children,
        }
    })

    return buildPageResult({ list, total, page, pageSize })
}

/**
 * 发布评论
 */
export function createComment(options: {
    contentType: CommentContentType
    contentId: number
    user: string
    content: string
}) {
    const db = useDb()
    const date = UTC2Date('', 'yyyy-mm-dd hh:ii:ss')
    const row = db.insert(comments).values({
        contentType: options.contentType,
        contentId: options.contentId,
        parentId: null,
        userName: options.user,
        avatar: DEFAULT_AVATAR,
        date,
        body: options.content,
    }).returning().get()

    return row
}
