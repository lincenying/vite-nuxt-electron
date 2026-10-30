import { getValidatedQuery } from 'h3'
import { getArticleDetail } from '~~/server/services/article.service'
import { fail, success } from '~~/server/utils/response'
import { idQuerySchema } from '~~/server/utils/schemas'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, idQuerySchema.parse)
    const data = getArticleDetail(query.id)
    if (!data) {
        return fail(404, '文章不存在')
    }
    return success(data, 'API is working!')
})
