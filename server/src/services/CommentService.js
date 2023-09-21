import { dbContext } from "../db/DbContext.js"


class commentService {
    async createComment(commentData) {
        const comment = await dbContext.Comment.create(commentData)
        await comment.populate('creator', '-email')
        return comment
    }

    async getEventComments(eventId) {

    }
}

export const CommentService = new commentService