import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { EventService } from "../services/EventService.js";
import { CommentService } from "../services/CommentService.js";
import { TicketService } from "../services/TIcketService.js";


export class EventController extends BaseController {
    constructor() {
        super('/api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getOneEvent)
            .get('/:eventId/comments', this.getEventComments)
            .get('/:eventId/tickets', this.getEventTickets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
    }

    async createEvent(req, res, next) {
        try {
            const eventData = req.body
            eventData.creatorId = req.userInfo.id
            const event = await EventService.createEvent(eventData)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEvents(req, res, next) {
        try {
            const events = await EventService.getEvents(req.query)
            res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getOneEvent(req, res, next) {
        try {
            const event = await EventService.getOneEvent(req.params.eventId)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEventComments(req, res, next) {
        try {
            const eventId = req.params.eventId
            const comments = await CommentService.getEventComments(eventId)
            res.send(comments)
        } catch (error) {
            next(error)
        }
    }

    async getEventTickets(req, res, next) {
        try {
            const eventId = req.params.eventId
            const tickets = await TicketService.getEventTickets(eventId)
            res.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {
        try {
            const eventData = req.body
            const object = {}
            object.eventId = req.params.eventId
            object.accountId = req.userInfo.id
            const updatedEvent = await EventService.editEvent(eventData, object)
            res.send(updatedEvent)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(req, res, next) {
        try {
            const event = await EventService.cancelEvent(req.params.eventId, req.userInfo.id)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }
}