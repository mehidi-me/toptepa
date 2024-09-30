import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
    await connectDB();

    const { name, email, password, fiverrName } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Create and save new user
    const newUser = new User({ name, email, password, fiverrName });
    await newUser.save();

    return NextResponse.json({ success: true, user: { email: newUser.email, id: newUser._id } });
}
