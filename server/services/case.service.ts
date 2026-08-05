import { cases } from '../db/schema'
import {
    getContentDetail,
    getContentRecommend,
    getContentRelated,
    getCoverContentList,
} from './content.service'

/** 案例列表 */
export function listCases(page: number, pageSize: number) {
    return getCoverContentList(cases, page, pageSize)
}

/** 案例详情 */
export function getCaseDetail(id: number) {
    return getContentDetail(cases, id)
}

/** 案例推荐 */
export function listCaseRecommend() {
    return getContentRecommend(cases, 4)
}

/** 案例相关推荐 */
export function listCaseRelated() {
    return getContentRelated(cases, { limit: 10 })
}
