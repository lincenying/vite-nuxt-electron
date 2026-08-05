import { news } from '../db/schema'
import {
    getContentDetail,
    getContentRecommend,
    getContentRelated,
    getSimpleContentList,
} from './content.service'

/** 新闻列表 */
export function listNews(page: number, pageSize: number) {
    return getSimpleContentList(news, page, pageSize)
}

/** 新闻详情 */
export function getNewsDetail(id: number) {
    return getContentDetail(news, id)
}

/** 新闻推荐 */
export function listNewsRecommend() {
    return getContentRecommend(news, 4)
}

/** 新闻相关推荐 */
export function listNewsRelated() {
    return getContentRelated(news, { limit: 10 })
}
