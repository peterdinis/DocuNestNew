import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import authOptions from '../auth/authOptions';
import { db } from '@/app/_utils/db';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    const allWorkspaces = await db.workspace.findMany({
        where: {
            userId: session.user.id,
            AND: {
                inTrash: true
            }
        },
    });

    const allCountedWorkspaces = await db.workspace.count({
        where: {
            userId: session.user.id,
        },
    });

    return NextResponse.json({
        workspaces: allWorkspaces,
        totalCount: allCountedWorkspaces,
    });
}
