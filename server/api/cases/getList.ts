import { getValidatedQuery } from 'h3'
import { listCases } from '~~/server/services/case.service'
import { listPageSchema } from '~~/server/utils/schemas'
import { success } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, listPageSchema.parse)
    return success(listCases(query.page, query.pageSize))
})
