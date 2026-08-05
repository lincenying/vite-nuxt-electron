import { getValidatedQuery } from 'h3'
import { listProductRelated } from '~~/server/services/product.service'
import { relatedQuerySchema } from '~~/server/utils/schemas'
import { success } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, relatedQuerySchema.parse)
    return success(listProductRelated(query.categoryId))
})
