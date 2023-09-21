import { Auth0Provider } from "@bcwdev/auth0provider";
import { TicketService } from "../services/TIcketService.js";
import BaseController from "../utils/BaseController.js";


export class TicketController extends BaseController {
    constructor() {
        super('/api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
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
}