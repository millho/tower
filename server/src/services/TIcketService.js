import { dbContext } from "../db/DbContext.js"
import { EventService } from "./EventService.js"

//REVIEW cannot read properties reading 'id' error on postman... 

class ticketService {
    async createTicket(ticketData) {
        const ticket = await dbContext.Ticket.create(ticketData)
        await ticket.populate('profile', '-email')
        await ticket.populate('event')
        return ticket
    }
}

export const TicketService = new ticketService