import { reactive } from 'vue'
import { Event } from './models/Event.js'
import { Comment } from './models/Comment.js'
import {Ticket } from './models/Ticket.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},

  /** @type {import('./models/Account.js').Account} */
  account: {},

  /**@type {Event[]} */
  events: [],

  /**@type {Event} */
  activeEvent: {},

  /**@type {Comment[]} */
  activeComments: [],

  /**@type {Ticket[]} */
  activeTickets: [],
})
