import { getValidatedQuery } from 'h3'
import { getNewsDetail } from '~~/server/services/news.service'
import { idQuerySchema } from '~~/server/utils/schemas'
import { fail, success } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, idQuerySchema.parse)
    const data = getNewsDetail(query.id)
    if (!data) {
        return fail(404, '新闻不存在')
    }
    return success(data)
})
