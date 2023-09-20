import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class eventService {
    async createEvent(eventData) {
        const event = await dbContext.Event.create(eventData)
        await event.populate('creator ticketCount')
        return event
    }

    async getEvents(query) {
        const events = await dbContext.Event.find(query).populate('creator ticketCount')
        return events
    }

    async getOneEvent(eventId) {
        const event = await dbContext.Event.findById(eventId).populate('creator ticketCount')
        if (!event) { throw new BadRequest(`Invalid EventId: ${eventId}`) }
        return event
    }

    async editEvent(eventData, eventId) {
        const original = await this.getOneEvent(eventId)
        if (original.isCanceled) { throw new BadRequest('Invalid Request: Event is already Cancelled') }
        original.name = eventData.name || original.name
        original.description = eventData.description || original.description
        original.coverImg = eventData.coverImg || original.coverImg
        original.location = eventData.location || original.location
        original.capacity = eventData.capacity || original.capacity
        original.startDate = eventData.startDate || original.startDate
        original.type = eventData.type || original.type
        await original.save()
        return original
    }

    async cancelEvent(eventId, userId) {
        const event = await this.getOneEvent(eventId)
        if (event.creatorId != userId) { throw new Forbidden }
        event.isCanceled = !event.isCanceled
        await event.save()
        return event
    }
}

export const EventService = new eventService()