import { getValidatedQuery } from 'h3'
import { listFaqs } from '~~/server/services/faq.service'
import { listPageSchema } from '~~/server/utils/schemas'
import { success } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, listPageSchema.parse)
    return success(listFaqs(query.page, query.pageSize))
})
