import { readValidatedBody } from 'h3'
import { loginByPassword } from '~~/server/services/user.service'
import { loginSchema } from '~~/server/utils/schemas'
import { fail, success } from '~~/server/utils/response'

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, loginSchema.parse)
    const data = loginByPassword(body.name, body.password)
    if (!data) {
        return fail(401, '用户名或密码错误')
    }
    return success(data, 'success')
})
