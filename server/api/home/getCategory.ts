import { listCategories } from '~~/server/services/product.service'
import { success } from '~~/server/utils/response'

export default defineEventHandler(async () => {
    return success(listCategories())
})
