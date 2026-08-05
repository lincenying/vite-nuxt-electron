import { readValidatedBody } from 'h3'
import { addDemoUser } from '~~/server/services/user.service'
import { demoUserAddSchema } from '~~/server/utils/schemas'

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, demoUserAddSchema.parse)
    const result = addDemoUser(body)
    return {
        code: 200,
        message: 'API is working!',
        result: result.result,
        data: result.data,
    }
})
