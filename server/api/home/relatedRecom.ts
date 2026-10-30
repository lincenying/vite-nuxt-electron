import { getValidatedQuery } from 'h3'
import { listProductRelated } from '~~/server/services/product.service'
import { success } from '~~/server/utils/response'
import { relatedQuerySchema } from '~~/server/utils/schemas'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, relatedQuerySchema.parse)
    return success(listProductRelated(query.categoryId))
})
