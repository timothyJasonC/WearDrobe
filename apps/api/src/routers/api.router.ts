import { Router } from 'express'
import { AccountRouter } from './account.router'
import { UserRouter } from './user.router'


export class ApiRouter {
    private router: Router
    private accountRouter: AccountRouter
    private userRouter: UserRouter


    constructor() {
        this.router = Router()

        this.accountRouter = new AccountRouter()
        this.userRouter = new UserRouter()
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use('/account', this.accountRouter.getRouter())
        this.router.use('/user', this.userRouter.getRouter())
    }

    getRouter(): Router {
        return this.router
    }
}

