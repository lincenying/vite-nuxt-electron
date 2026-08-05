import { getValidatedQuery } from 'h3'
import { listProducts } from '~~/server/services/product.service'
import { productListSchema } from '~~/server/utils/schemas'
import { success } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, productListSchema.parse)
    const data = listProducts(query.page, query.pageSize, query.category, query.tag)
    return success(data)
})
