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

    async deleteTicket(ticketId) {
        const ticket = dbContext.Ticket.findById(ticketId)
        await ticket.remove()
        return 'Ticket Deleted'
    }

    async getAccountTickets(accountId) {
        const tickets = await dbContext.Ticket.find({ accountId }).populate('event profile')
        return tickets
    }

    async getEventTickets(eventId) {
        const tickets = await dbContext.Ticket.find({ eventId }).populate('event profile')
        return tickets
    }
}

export const TicketService = new ticketService