import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { Comment } from "../models/Comment"


class commentService{
    async getEventComments(eventId){
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('fetched comments ✅',res.data)
        AppState.activeComments = res.data.map(comment => new Comment(comment))
    }

    async createComment(commentData){
        const res = await api.post('/api/comments', commentData)
        AppState.activeComments.unshift(new Comment(res.data))
    }
}

export const CommentService = new commentService()