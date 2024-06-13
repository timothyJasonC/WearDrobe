import { Request, Response } from "express";
import { serverResponse } from "@/helpers/apiResponse";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import prisma from "@/prisma";

export class AccountController {
    async loginAccount(req: Request, res: Response) {
        try {

        const { email, password } = req.body

        const admin = await prisma.admin.findUnique({ where: { email } })
        const user = await prisma.user.findUnique({ where: { email } })
        
        if ((user && user.password) && user.accountActive) {
            const passwordValid = await compare(password, user.password);
            if (passwordValid == false) return serverResponse(res, 401, 'ok', 'password incorrect!')
            const payload = { id: user.id, role: 'user' }
            const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h'});
            return serverResponse(res, 200, 'ok', 'login success', { user, token })
        } else if ((admin && admin.password) && admin.accountActive) {
            const passwordValid = await compare(password, admin.password);
            if (passwordValid == false) return serverResponse(res, 401, 'ok', 'password incorrect!')
            const payload = { id: admin.id, role: admin.role }
            const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h'});
            return serverResponse(res, 200, 'ok', 'login success', { admin, token })
        } else {
            return serverResponse(res, 404, 'error', 'account not found')
        }

    } catch (error: any) {
        serverResponse(res, 400, 'error', error)
    }
    }

    async verifyUser(req: Request, res: Response) {
        try {
            const accountID = req.body.account.id
            const user = await prisma.user.findFirst({ where: { id: accountID } })
    
            if (user) {
                await prisma.user.update({ where: { id: accountID }, data: { accountActive: true } })
            } else { return serverResponse(res, 404, 'error', 'user not found') }
            
            serverResponse(res, 200, 'ok', 'Account has been verified!')
    
        } catch (error: any) {
            serverResponse(res, 400, 'error', error)
        }
    }

    async verifyAdmin(req: Request, res: Response) {
        try {
            const accountID = req.body.account.id
            const admin = await prisma.admin.findFirst({ where: { id: accountID } })
            
            if (admin) {
                await prisma.admin.update({ where: { id: accountID }, data: { accountActive: true } })
            } else { return serverResponse(res, 404, 'error', 'user not found') }
            
            serverResponse(res, 200, 'ok', 'Account has been verified!')
    
        } catch (error: any) {
            serverResponse(res, 400, 'error', error)
        }
    }
}


