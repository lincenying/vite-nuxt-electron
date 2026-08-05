import { readValidatedBody } from 'h3'
import { editArticle } from '~~/server/services/article.service'
import { articleEditSchema } from '~~/server/utils/schemas'
import { success } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, articleEditSchema.parse)
    const data = editArticle(body)
    return success(data, 'API is working!')
})
