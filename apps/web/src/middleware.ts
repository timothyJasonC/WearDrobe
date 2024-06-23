import { JwtPayload, jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import { isTokenExp } from './lib/utils';

interface CustomJwtPayload extends JwtPayload {
    role: 'warAdm' | 'superAdm' | 'user';
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
        const isExp = isTokenExp(token);
        if (isExp) {
            const response = NextResponse.redirect(new URL(`/auth`, req.url));
            response.cookies.delete('token');
            response.cookies.delete('role');
            return response;
        } else {
            try {
                const decoded: CustomJwtPayload = jwtDecode(token);
                
                if (pathname.startsWith('/auth')) {
                    if (decoded.role === 'warAdm' || decoded.role === 'superAdm') {
                        return NextResponse.redirect(new URL('/admins/overview', req.url));
                    }
                    return NextResponse.redirect(new URL('/', req.url));
                }
                
                if (pathname.startsWith('/admins')) {
                    if (decoded.role === 'warAdm' || decoded.role === 'superAdm') {
                        return NextResponse.next();
                    }
                    return NextResponse.redirect(new URL('/', req.url));
                } else if (pathname.startsWith('/user')) {
                    if (decoded.role === 'user') {
                        return NextResponse.next();
                    }
                    if (decoded.role === 'warAdm' || decoded.role === 'superAdm') {
                        return NextResponse.redirect(new URL('/admins/overview', req.url));
                    }
                    return NextResponse.redirect(new URL('/auth', req.url));
                } else if (pathname === '/') {
                    if (decoded.role === 'warAdm' || decoded.role === 'superAdm') {
                        return NextResponse.redirect(new URL('/admins/overview', req.url));
                    }
                    return NextResponse.next();
                } else if (pathname.startsWith('/catalog')) {
                    if (decoded.role === 'warAdm' || decoded.role === 'superAdm') {
                        return NextResponse.redirect(new URL('/admins/overview', req.url));
                    }
                    return NextResponse.next();
                }
        
            } catch (err) {
                const response = NextResponse.redirect(new URL('/auth', req.url));
                response.cookies.delete('token');
                response.cookies.delete('role');
                return response;
            }
        }
    }
}

export const config = {
    matcher: ['/admins/:path*', '/user/:path*', '/auth', '/', '/catalog/:path*'],
};
