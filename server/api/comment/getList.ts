import { getValidatedQuery } from 'h3'
import { listComments } from '~~/server/services/comment.service'
import { success } from '~~/server/utils/response'
import { commentListSchema } from '~~/server/utils/schemas'

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, commentListSchema.parse)
    const data = listComments({
        page: query.page,
        pageSize: query.pageSize,
        contentId: query.id,
        contentType: query.type,
    })
    return success(data)
})
