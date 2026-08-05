import { listNewsRecommend } from '~~/server/services/news.service'
import { success } from '~~/server/utils/response'

export default defineEventHandler(async () => {
    return success(listNewsRecommend())
})
