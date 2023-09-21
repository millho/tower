import { Schema } from "mongoose";


export const CommentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    body: { type: String, required: true, maxLength: 200, minLength: 5 }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})