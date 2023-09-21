import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { CommentService } from "../services/CommentService.js";


export class CommentController extends BaseController {
    constructor() {
        super('/api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
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
}