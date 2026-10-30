import { readValidatedBody } from 'h3'
import { editArticle } from '~~/server/services/article.service'
import { success } from '~~/server/utils/response'
import { articleEditSchema } from '~~/server/utils/schemas'

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, articleEditSchema.parse)
    const data = editArticle(body)
    return success(data, 'API is working!')
})
