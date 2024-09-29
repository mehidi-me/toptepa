import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: Request) {
    const cookie = serialize('auth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60,
        path: '/',
    });

    return NextResponse.json({
        success: 'Logout successful'
    }, {
        headers: {
            'Set-Cookie': cookie,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
