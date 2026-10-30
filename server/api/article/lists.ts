import { getValidatedQuery } from 'h3'
import { listArticles } from '~~/server/services/article.service'
import { success } from '~~/server/utils/response'
import { listPageSchema } from '~~/server/utils/schemas'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, listPageSchema.parse)
    return success(listArticles(query.page, query.pageSize), 'API is working!')
})
