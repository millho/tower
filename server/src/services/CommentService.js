import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class commentService {
    async createComment(commentData) {
        const comment = await dbContext.Comment.create(commentData)
        await comment.populate('creator', '-email')
        return comment
    }

    async getEventComments(eventId) {
        const comments = await dbContext.Comment.find({ eventId }).populate('creator', '-email')
        return comments
    }

    async deleteComment(commentId, userId) {
        const comment = await dbContext.Comment.findById(commentId)
        if (comment.creatorId != userId) { throw new Forbidden }
        await comment.remove()
        return 'Comment deleted'
    }
}

export const CommentService = new commentService