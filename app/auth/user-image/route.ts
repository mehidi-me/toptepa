import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User2';
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const url = new URL(req.url)

    const id = url.searchParams.get("id") || 0


    
    const user = await User.findByPk(id, {
        attributes: ['id','profilePicture']
    });
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
}
