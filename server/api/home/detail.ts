import { getValidatedQuery } from 'h3'
import { getProductDetail } from '~~/server/services/product.service'
import { idQuerySchema } from '~~/server/utils/schemas'
import { fail, success } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, idQuerySchema.parse)
    const data = getProductDetail(query.id)
    if (!data) {
        return fail(404, '产品不存在')
    }
    return success(data)
})
