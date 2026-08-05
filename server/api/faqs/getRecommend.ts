import { listFaqRecommend } from '~~/server/services/faq.service'
import { success } from '~~/server/utils/response'

export default defineEventHandler(async () => {
    return success(listFaqRecommend())
})
