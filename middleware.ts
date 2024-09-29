// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('auth')?.value;

    if (token) {
        const user = verifyToken(token);
        if (user) {
            req.nextUrl.searchParams.set('user', JSON.stringify(user));
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
    matcher: ['/', '/profile', '/leaderboard', '/notifications', '/level',],
};
