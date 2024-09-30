import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/jwt';
import { serialize } from 'cookie';

export async function POST(req: Request) {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if password matches
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate JWT token
    const token = await signToken({ id: user._id.toString() });
    const cookie = serialize('auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60,
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
