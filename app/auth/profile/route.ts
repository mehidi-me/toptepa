import { NextResponse } from 'next/server';
import User2 from '@/models/User2';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { Op } from 'sequelize';

export async function GET(req: Request) {
    // Get token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('auth')?.value;

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const decoded: any = await verifyToken(token);
    if (!decoded) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find user by ID using Sequelize
    const user = await User2.findByPk(decoded.payload.id, {
        attributes: { exclude: ['password'] } // Exclude the password field
    });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userScore = user.totalScore;

    // Count how many users have a higher score
    const higherScoresCount = await User2.count({
        where: {
            totalScore: { [Op.gt]: userScore }
        }
    });

    const rank = higherScoresCount + 1;

    return NextResponse.json({ success: true, user, rank });
}
