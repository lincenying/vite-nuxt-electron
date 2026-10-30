import { getValidatedQuery } from 'h3'
import { listCases } from '~~/server/services/case.service'
import { success } from '~~/server/utils/response'
import { listPageSchema } from '~~/server/utils/schemas'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, listPageSchema.parse)
    return success(listCases(query.page, query.pageSize))
})
