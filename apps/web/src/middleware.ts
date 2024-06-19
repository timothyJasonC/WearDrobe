import { JwtPayload, jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import { isTokenExp } from './lib/utils';

interface CustomJwtPayload extends JwtPayload {
    role: 'warAdm' | 'superAdm' | 'user'
}

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const tokenCookie = req.cookies.get('token'); // Get the cookie object
    const token = tokenCookie ? tokenCookie.value : null;
    const url = req.nextUrl.pathname;
    const publicPaths = ['/', '/catalog'];
    
    if (!token) {
        return NextResponse.redirect(new URL(`/auth`, req.url));
    } else {
        const isExp = isTokenExp(token)
        if (!isExp) {
            const decoded: CustomJwtPayload = jwtDecode(token);
    
            try {
                // protecting routes
                if (pathname.startsWith('/admins')) {
                    if (decoded.role == 'warAdm') {
                        return NextResponse.next();
                    } else if (decoded.role == 'superAdm') {
                        // redirect to super admin route
                    }
                    return NextResponse.redirect(new URL('/', req.url));
                } else if (pathname.startsWith('/')) {
                    if (decoded.role == 'user') {
                        return NextResponse.next();
                    } else if (decoded.role == 'warAdm') {
                        // redirect to warehouse admin route
                    } else {
                        // redirect to super admin route
                    } 
                } else if (pathname.startsWith('/super')) {
                    if (decoded.role == 'user') {
                        return NextResponse.redirect(new URL('/', req.url));
                    } else if (decoded.role == 'warAdm') {
                        // redirect to warehouse admin route
                    } else {
                        // redirect to super admin route
                    } 
                } else if (pathname.startsWith('/user')) {
                    if (decoded.role == 'user') {
                        return NextResponse.next();
                    } else if (decoded.role == 'warAdm') {
                        // redirect to warehouse admin route
                    } else {
                        // redirect to super admin route
                    } 
                }
        
            } catch (err) {
                // Token verification failed, redirect to login
                const loginUrl = new URL('/', req.url);
                return NextResponse.redirect(loginUrl);
            }
        
            // return NextResponse.next();
        } else return NextResponse.redirect(new URL(`/auth`, req.url));
    }

    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    
}

export const config = {
    matcher: [
        '/admins/:path*', // Protect all /organizer routes
        '/user/:path*', // Protect all /user routes
    ],
};
