import { getValidatedQuery } from 'h3'
import { getCaseDetail } from '~~/server/services/case.service'
import { fail, success } from '~~/server/utils/response'
import { idQuerySchema } from '~~/server/utils/schemas'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, idQuerySchema.parse)
    const data = getCaseDetail(query.id)
    if (!data) {
        return fail(404, '案例不存在')
    }
    return success(data)
})
