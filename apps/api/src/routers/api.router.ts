import {Request, Response, Router} from 'express'
import { CategoryRouter } from './category.controller'


export class ApiRouter {
    private router: Router
    private categoryRouter: CategoryRouter 


    constructor() {
        this.router = Router()
        this.categoryRouter = new CategoryRouter()
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', (req:Request, res: Response) => {
            res.status(200).send({
                status: 'ok',
                message: 'test API'
            })
        })
        this.router.use('/categories', this.categoryRouter.getRouter())
    }

    getRouter(): Router {
        return this.router
    }
}
