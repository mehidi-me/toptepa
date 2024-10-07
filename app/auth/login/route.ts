import { NextResponse } from 'next/server';
import User2 from '@/models/User2';
import { signToken } from '@/lib/jwt';
import { serialize } from 'cookie';

export async function POST(req: Request) {


    const { phone, password } = await req.json();

    if (!phone || !password) {
        return NextResponse.json({ error: 'Phone and password are required' }, { status: 400 });
    }

    // Find user by phone
    const user = await User2.findOne({ where: { phone } });
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if password matches
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        return NextResponse.json({ error: 'Invalid phone or password' }, { status: 401 });
    }

    // Generate JWT token
    const token = await signToken({ id: user.id }); // Use `user.id` instead of `user._id`
    const cookie = serialize('auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
    });

    return NextResponse.json({
        success: 'Login successful'
    }, {
        headers: {
            'Set-Cookie': cookie,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
