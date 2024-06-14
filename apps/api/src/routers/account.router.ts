import { AccountController } from '@/controllers/account.controller';
import { verifyToken } from '@/middlewares/account.middleware';
import { Router } from 'express'

export class AccountRouter {
    private router: Router
    private accountController: AccountController

    constructor() {
        this.accountController = new AccountController()
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/login', this.accountController.loginAccount)
        this.router.post('/refresh-token', this.accountController.refreshToken)
    }

    getRouter() : Router{
        return this.router
    }
}