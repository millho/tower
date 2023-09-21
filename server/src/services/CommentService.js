import { dbContext } from "../db/DbContext.js"


class commentService {
    async createComment(commentData) {
        const comment = await dbContext.Comment.create(commentData)
        comment.populate('creator', '-email')
        return comment
    }

}

export const CommentService = new commentService