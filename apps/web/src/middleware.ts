import { JwtPayload, jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import { isTokenExp } from './lib/utils';

interface CustomJwtPayload extends JwtPayload {
    role: 'warAdm' | 'superAdm' | 'user'
}

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const tokenCookie = req.cookies.get('token');
    const token = tokenCookie ? tokenCookie.value : null;
    
    if (!token) {
        if (pathname.startsWith('/admins') || pathname.startsWith('/user')) {
            return NextResponse.redirect(new URL(`/auth`, req.url));
        }
        return NextResponse.next();
    } else {
        const isExp = isTokenExp(token)
        if (!isExp) {
            const decoded: CustomJwtPayload = jwtDecode(token);
            try {
                if (pathname.startsWith('/auth')) {
                    if (decoded.role == 'warAdm' || decoded.role == 'superAdm') {
                        return NextResponse.redirect(new URL('/admins/overview', req.url));
                    }
                    return NextResponse.redirect(new URL('/', req.url));
                }

                if (pathname.startsWith('/admins')) {
                    if (decoded.role == 'warAdm' || decoded.role == 'superAdm') {
                        return NextResponse.next(); 
                    }
                    return NextResponse.redirect(new URL('/', req.url));
                } else if (pathname.startsWith('/user')) {
                    if (decoded.role == 'user') {
                        return NextResponse.next();
                    }
                    if (decoded.role == 'warAdm' || decoded.role == 'superAdm') {
                        return NextResponse.redirect(new URL('/admins/overview', req.url));
                    }
                    return NextResponse.redirect(new URL('/auth', req.url));
                } else if (pathname === '/') {
                    if (decoded.role == 'warAdm' || decoded.role == 'superAdm') {
                        return NextResponse.redirect(new URL('/admins/overview', req.url));
                    }
                    return NextResponse.next(); 
                } else if (pathname.startsWith('/catalog')) {
                    if (decoded.role == 'warAdm' || decoded.role == 'superAdm') {
                        return NextResponse.redirect(new URL('/admins/overview', req.url));
                    }
                    return NextResponse.next(); 
                } 
        
            } catch (err) {
                const loginUrl = new URL('/', req.url);
                return NextResponse.redirect(loginUrl);
            }
        
        } else {
            return NextResponse.redirect(new URL(`/auth`, req.url));
        }
    }
}

export const config = {
    matcher: [ '/admins/:path*', '/user/:path*',  '/auth',  '/' , '/catalog/:path*' ],
};
