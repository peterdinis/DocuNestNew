import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/app/_utils/db';
import authOptions from '../../auth/authOptions';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    const userId = session.user.id;

    // Get all workspaces where the user is a member
    const workspaces = await db.workspaceMember.findMany({
        where: { userId },
        include: {
            workspace: true,
        },
    });

    return NextResponse.json(workspaces.map((wm) => wm.workspace));
}
