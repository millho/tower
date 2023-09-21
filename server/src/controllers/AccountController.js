import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { TicketService } from '../services/TIcketService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getAccountTickets)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAccountTickets(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const tickets = await TicketService.getAccountTickets(accountId)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
}
