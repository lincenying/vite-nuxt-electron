import { readValidatedBody } from 'h3'
import { createComment } from '~~/server/services/comment.service'
import { success } from '~~/server/utils/response'
import { commentPostSchema } from '~~/server/utils/schemas'

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, commentPostSchema.parse)
    createComment({
        contentType: body.comment_type,
        contentId: body.comment_id,
        user: body.user,
        content: body.content,
    })
    return success(null)
})
