import { NextFunction, Request, Response } from "express";
import { serverResponse } from "@/helpers/apiResponse";
import prisma from "@/prisma";
import { sign } from "jsonwebtoken";
import { v4 as uuid } from 'uuid'
import path from 'path'
import fs from 'fs'
import { transporter } from "@/helpers/nodemailer";
import handlebars from "handlebars";
import { genSalt, hash } from "bcrypt";

export class UserController {
    async createUser(req: Request, res: Response) {
        try { 

            const { email } = req.body;
            const existingUserEmail = await prisma.user.findUnique({ where: { email: email } })
            const existingAdminEmail = await prisma.admin.findUnique({ where: { email: email } })

            if (existingUserEmail || existingAdminEmail) {
                return serverResponse(res, 409, 'error', 'email has been taken')
            } 
    
            const user = await prisma.user.create({
                data: { id: uuid(), ...req.body }
            })
    
            const payload = { id: user.id, role: 'user' }
            const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h' })
            const link = `http://localhost:3000/verify/user/${token}`;
    
            const templatePath = path.join(__dirname, "../templates", "register.html")
            const templateSource = fs.readFileSync(templatePath, 'utf-8')
            const compiledTemplate = handlebars.compile(templateSource)
            const html = compiledTemplate({ link })
    
            await transporter.sendMail({
                from: "weardrobe2000@gmail.com",
                to: user.email,
                subject: "Welcome to WearDrobe! Verify Your Email to Get Started",
                html
            })
            
            serverResponse(res, 201, 'ok', 'user has been registered!')
    
        } catch (error: any) {
            serverResponse(res, 400, 'error', error)
        }
    }

    async setupUser(req: Request, res: Response, next: NextFunction) {
        try { 

            const { username, password, dob, gender, account } = req.body;
            const existingUsername = await prisma.user.findUnique({ where: { username: username } })

            if (existingUsername) {
                return serverResponse(res, 409, 'error', 'username has been taken')
            } 
            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);

            const user = await prisma.user.update({
                where: { id: account.id },
                data : {
                    username,
                    password: hashedPassword,
                    dob: new Date(dob),
                    gender
                }
            })
            console.log('setting up user:', user)
            next()
            // serverResponse(res, 200, 'ok', 'user account has been setup!')
    
        } catch (error: any) {
            serverResponse(res, 400, 'error', error)
        }
    }
}