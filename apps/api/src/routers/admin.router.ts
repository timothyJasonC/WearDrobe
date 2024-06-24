import { AccountController } from '@/controllers/account.controller';
import { Router } from 'express'
import { AdminController } from '@/controllers/admin.controller';
import { verifyToken } from '@/middlewares/account.middleware';

export class AdminRouter {
    private router: Router
    private adminController: AdminController
    private accountController: AccountController

    constructor() {
        this.accountController = new AccountController()
        this.adminController = new AdminController()
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', this.adminController.createAdmin);
        this.router.post('/setup-verify-admin', verifyToken, this.adminController.setupAdmin, this.accountController.verifyAdmin);
    }

    getRouter() : Router{
        return this.router
    }
}