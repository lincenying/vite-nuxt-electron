import { getValidatedQuery } from 'h3'
import { getDemoUserDetail } from '~~/server/services/user.service'
import { idQuerySchema } from '~~/server/utils/schemas'
import { fail, success } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, idQuerySchema.parse)
    const data = getDemoUserDetail(query.id)
    if (!data) {
        return fail(404, '用户不存在')
    }
    return success(data, 'API is working!')
})
