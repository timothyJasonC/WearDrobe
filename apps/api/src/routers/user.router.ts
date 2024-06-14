import { UserController } from '@/controllers/user.controller';
import { AccountController } from '@/controllers/account.controller';
import { Router } from 'express'
import { verifyToken } from '@/middlewares/account.middleware';

export class UserRouter {
    private router: Router
    private userController: UserController
    private accountController: AccountController

    constructor() {
        this.userController = new UserController()
        this.accountController = new AccountController()
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', this.userController.createUser);
        this.router.post('/create-sso-user', this.userController.createSSOUser);
        this.router.post('/setup-verify-user', verifyToken, this.userController.setupUser, this.accountController.verifyUser);
    }

    getRouter() : Router{
        return this.router
    }
}