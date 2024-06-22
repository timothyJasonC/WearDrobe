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

export class AdminController {
    async createAdmin(req: Request, res: Response) {
        try { 
            const { email } = req.body;
            const existingUserEmail = await prisma.user.findUnique({ where: { email: email } })
            const existingAdminEmail = await prisma.admin.findUnique({ where: { email: email } })
    
            if (existingUserEmail || existingAdminEmail) {
                return serverResponse(res, 409, 'error', 'email has been taken', existingUserEmail || existingAdminEmail)
            } 
    
            const admin = await prisma.admin.create({
                data: { id: uuid(), ...req.body }
            })
    
            const payload = { id: admin.id, role: admin.role }
            const token = sign(payload, process.env.KEY_JWT!, { expiresIn: '1h' })
            const link = `http://localhost:3000/verify/admin/${token}`;
    
            const templatePath = path.join(__dirname, "../templates", "registerAdmin.html")
            const templateSource = fs.readFileSync(templatePath, 'utf-8')
            const compiledTemplate = handlebars.compile(templateSource)
            const html = compiledTemplate({ link })
    
            await transporter.sendMail({
                from: "weardrobe2000@gmail.com",
                to: admin.email,
                subject: "Welcome to WearDrobe! Verify Your Email to Get Started",
                html
            })
            
            serverResponse(res, 201, 'ok', 'user has been registered!', admin)
    
        } catch (error: any) {
            serverResponse(res, 400, 'error', error)
        }
    }

    async setupAdmin(req: Request, res: Response, next: NextFunction) {
        try { 

            const { fullName, password, dob, gender, account } = req.body;

            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);

            const admin = await prisma.admin.update({
                where: { id: account.id },
                data : {
                    fullName, gender,
                    password: hashedPassword,
                    dob: new Date(dob),
                }
            })
            next()
    
        } catch (error: any) {
            serverResponse(res, 400, 'error', error)
        }
    }
}