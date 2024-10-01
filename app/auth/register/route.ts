import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
    await connectDB();

    const { name, phone, password } = await req.json();

    if (!phone || !password) {
        return NextResponse.json({ error: 'Phone and password are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Create and save new user
    const newUser = new User({ name, phone, password });
    await newUser.save();

    return NextResponse.json({ success: true, user: { phone: newUser.phone, id: newUser._id } });
}
