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

    async getMyTickets(){
        const res = await api.get('account/tickets')
        AppState.myTickets = res.data.map(ticket=> new Ticket(ticket))
    }

    async deleteTicket(ticketId){
        await api.delete(`/api/tickets/${ticketId}`)
        let index = AppState.activeTickets.findIndex(ticket => ticket.id == ticketId)
        AppState.activeTickets.splice(index, 1)
    }
}

export const TicketService = new ticketService