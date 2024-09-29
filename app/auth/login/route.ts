import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/jwt';
import { serialize } from 'cookie';

export async function POST(req: Request) {
    await connectDB();

    const { phone, password } = await req.json();

    if (!phone || !password) {
        return NextResponse.json({ error: 'Phone and password are required' }, { status: 400 });
    }

    // Find user by phone
    const user = await User.findOne({ phone });
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if password matches
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        return NextResponse.json({ error: 'Invalid phone or password' }, { status: 401 });
    }

    // Generate JWT token
    const token = await signToken({ id: user._id.toString() });
    const cookie = serialize('auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hour
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
