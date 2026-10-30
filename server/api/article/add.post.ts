import { readValidatedBody } from 'h3'
import { addArticle } from '~~/server/services/article.service'
import { articleAddSchema } from '~~/server/utils/schemas'

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, articleAddSchema.parse)
    const result = addArticle(body)
    return {
        code: 200,
        message: 'API is working!',
        result: result.result,
        data: result.data,
    }
})
