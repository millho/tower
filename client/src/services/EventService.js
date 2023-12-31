import { AppState } from "../AppState"
import { Event } from "../models/Event"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class eventService{
    async getEvents(){
        const res = await api.get('/api/events')
        logger.log('fetched events ✅', res.data)
        AppState.events = await res.data.map(event => new Event(event))
    }

    async getOneEvent(eventId){
        AppState.activeEvent = {}
        const res = await api.get(`/api/events/${eventId}`)
        logger.log('fetched event ✅', res.data)
        AppState.activeEvent = new Event(res.data)
    }

    async getMyEvents(creatorId){
        const res = await api.get(`/api/events?creatorId=${creatorId}`)
        logger.log('fetched events ✅', res.data)
        AppState.myEvents = res.data.map(event=> new Event(event))
    }

    async cancelEvent(eventId){
        await api.delete(`/api/events/${eventId}`)
    }
}

export const EventService = new eventService()