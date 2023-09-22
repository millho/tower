import { Auth0Provider } from "@bcwdev/auth0provider";
import { TicketService } from "../services/TIcketService.js";
import BaseController from "../utils/BaseController.js";


export class TicketController extends BaseController {
    constructor() {
        super('/api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.deleteTicket)
    }

    async createTicket(req, res, next) {
        try {
            const ticketData = req.body
            ticketData.accountId = req.userInfo.id
            const ticket = await TicketService.createTicket(ticketData)
            res.send(ticket)
        } catch (error) {
            next(error)
        }
    }

    async deleteTicket(req, res, next) {
        try {
            const ticketId = req.params.ticketId
            const userId = req.userInfo.id
            const message = await TicketService.deleteTicket(ticketId, userId)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }
}