import { Event } from "../models/Event.js"


export class Ticket{
    constructor(data){
        this.id = data.id
        this.eventId = data.eventId
        this.accountId = data.accountId
        this.event = new Event(data.event)
        this.profile = data.profile
    }
}