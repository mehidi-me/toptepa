// app/api/register/route.ts
import { NextResponse } from 'next/server';
import User2 from '@/models/User2';



export async function POST(req: Request) {
  

    const { name, phone, password,profilePicture } = await req.json();

    if (!phone || !password) {
        return NextResponse.json({ error: 'Phone and password are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User2.findOne({ where: { phone } });
    if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Create and save new user
    const newUser = User2.build({
        name,
        phone,
        password: await User2.prototype.hashPassword(password),
        currentLevel: 'level1', // Set default currentLevel
        profilePicture
    });

    await newUser.save();

    return NextResponse.json({ success: true, user: { phone: newUser.phone, id: newUser.id } });
}
