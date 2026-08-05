import { listDemoUsers } from '~~/server/services/user.service'
import { success } from '~~/server/utils/response'

export default defineEventHandler(async () => {
    return success(listDemoUsers(), 'API is working!')
})
