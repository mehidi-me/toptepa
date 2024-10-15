import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User2';
import Winner from '@/models/Winner';
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    // Fetch users from the database, sorting by `totalScore` and limiting to 100 results
    const users = await User.findAll({
        attributes: ['id','name', 'dailyCorrectTapCount'], // Select the required fields
        order: [['dailyCorrectTapCount', 'DESC']], // Sort by totalScore in descending order
        limit: 100, // Limit to 100 users
    });
    const winners = await Winner.findAll({
        attributes: { exclude: ['profilePicture'] }
    });

    if (!users || users.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, users,winners });
}
