import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { api } from "./AxiosService"


class ticketService{
    async createTicket(ticketData){
        const res = await api.post('/api/tickets', ticketData)
        AppState.activeTickets.push(new Ticket(res.data))
    }

    async getEventTickets(eventId){
        const res = await api.get(`/api/events/${eventId}/tickets`)
        AppState.activeTickets = res.data.map(ticket=> new Ticket(ticket))
    }
}

export const TicketService = new ticketService