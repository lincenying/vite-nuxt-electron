/**
 * 计算分页偏移量
 */
export function getOffset(page: number, pageSize: number): number {
    return (page - 1) * pageSize
}

/**
 * 构造前端约定的分页结果
 */
export function buildPageResult<T>(options: {
    list: T[]
    total: number
    page: number
    pageSize: number
    /** 兼容旧 sqlite3 接口额外字段 */
    extra?: Record<string, number>
}) {
    const { list, total, page, pageSize, extra } = options
    const offset = getOffset(page, pageSize)
    return {
        list,
        total,
        pageSize,
        currPage: page,
        hasPrev: page > 1 ? 1 : 0,
        hasNext: total > offset + pageSize ? 1 : 0,
        ...extra,
    }
}
