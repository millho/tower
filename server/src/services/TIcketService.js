import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { EventService } from "./EventService.js"


class ticketService {
    async createTicket(ticketData) {
        const ticket = await dbContext.Ticket.create(ticketData)
        await ticket.populate('profile', '-email')
        await ticket.populate('event')
        return ticket
    }

    async deleteTicket(ticketId, userId) {
        const ticket = await dbContext.Ticket.findById(ticketId)
        if (ticket.accountId != userId) { throw new Forbidden }
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