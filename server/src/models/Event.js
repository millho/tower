import { Schema } from "mongoose";


export const EventSchema = new Schema({
    name: { type: String, required: true, maxLength: 35 },
    description: { type: String, required: true, maxLength: 1000 },
    coverImg: { type: String, required: true, maxLength: 1000 },
    location: { type: String, required: true, maxLength: 35 },
    capacity: { type: Number, required: true },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: true, default: false },
    type: { type: String, required: true, enum: ['concert', 'convention', 'sport', 'digital'], lowercase: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
}, { timestamps: true, toJSON: { virtuals: true } })

EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

EventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})