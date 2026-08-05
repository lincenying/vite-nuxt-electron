import { faqs } from '../db/schema'
import {
    getContentDetail,
    getContentRecommend,
    getContentRelated,
    getSimpleContentList,
} from './content.service'

/** FAQ 列表 */
export function listFaqs(page: number, pageSize: number) {
    return getSimpleContentList(faqs, page, pageSize)
}

/** FAQ 详情 */
export function getFaqDetail(id: number) {
    return getContentDetail(faqs, id)
}

/** FAQ 推荐 */
export function listFaqRecommend() {
    return getContentRecommend(faqs, 4)
}

/** FAQ 相关推荐 */
export function listFaqRelated() {
    return getContentRelated(faqs, { limit: 10 })
}
