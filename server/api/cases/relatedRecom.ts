import { listCaseRelated } from '~~/server/services/case.service'
import { success } from '~~/server/utils/response'

export default defineEventHandler(async () => {
    return success(listCaseRelated())
})
