import { listArticleRelated } from '~~/server/services/article.service'
import { success } from '~~/server/utils/response'

export default defineEventHandler(async () => {
    return success(listArticleRelated(), 'API is working!')
})
