import { getValidatedQuery } from 'h3'
import { listNews } from '~~/server/services/news.service'
import { listPageSchema } from '~~/server/utils/schemas'
import { success } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, listPageSchema.parse)
    return success(listNews(query.page, query.pageSize))
})
