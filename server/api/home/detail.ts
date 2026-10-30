import { getValidatedQuery } from 'h3'
import { getProductDetail } from '~~/server/services/product.service'
import { fail, success } from '~~/server/utils/response'
import { idQuerySchema } from '~~/server/utils/schemas'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, idQuerySchema.parse)
    const data = getProductDetail(query.id)
    if (!data) {
        return fail(404, '产品不存在')
    }
    return success(data)
})
