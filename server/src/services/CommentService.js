import { dbContext } from "../db/DbContext.js"


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

    async deleteComment(commentId) {
        const comment = await dbContext.Comment.findById(commentId)
        await comment.remove()
        return 'Comment deleted'
    }
}

export const CommentService = new commentService