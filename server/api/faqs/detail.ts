import { getValidatedQuery } from 'h3'
import { getFaqDetail } from '~~/server/services/faq.service'
import { fail, success } from '~~/server/utils/response'
import { idQuerySchema } from '~~/server/utils/schemas'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, idQuerySchema.parse)
    const data = getFaqDetail(query.id)
    if (!data) {
        return fail(404, '问答不存在')
    }
    return success(data)
})
