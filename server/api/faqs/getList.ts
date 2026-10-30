import { getValidatedQuery } from 'h3'
import { listFaqs } from '~~/server/services/faq.service'
import { success } from '~~/server/utils/response'
import { listPageSchema } from '~~/server/utils/schemas'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, listPageSchema.parse)
    return success(listFaqs(query.page, query.pageSize))
})
