import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    await connectDB();
    
    const users = await User.find({}).select(['name', 'totalScore', 'tapCount', 'profilePicture']).sort({ totalScore: -1 }).limit(100).lean();

    if (!users) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, users });
}