import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User2';
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    // Fetch users from the database, sorting by `totalScore` and limiting to 100 results
    const users = await User.findAll({
        attributes: ['id','name', 'totalScore', 'tapCount'], // Select the required fields
        order: [['totalScore', 'DESC']], // Sort by totalScore in descending order
        limit: 100, // Limit to 100 users
    });

    if (!users || users.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, users });
}
