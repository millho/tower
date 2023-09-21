import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { CommentService } from "../services/CommentService.js";
import { EventController } from "./EventController.js";


export class CommentController extends BaseController {
    constructor() {
        super('/api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.deleteComment)
    }

    async createComment(req, res, next) {
        try {
            const commentData = req.body
            commentData.creatorId = req.userInfo.id
            const comment = await CommentService.createComment(commentData)
            res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async deleteComment(req, res, next) {
        try {
            const commentId = req.params.commentId
            const message = await CommentService.deleteComment(commentId)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }
}