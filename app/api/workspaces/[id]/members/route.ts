import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/_utils/db';
import authOptions from '@/app/api/auth/authOptions';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split('/')[3];

    if (!id) {
        return NextResponse.json(
            { error: 'Missing id parameter' },
            { status: 400 },
        );
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    const workspaceMembers = await db.workspace.findMany({
        where: {
            userId: session.user.id,
            id,
        },
        include: {
            members: true,
        },
    });

    if (!workspaceMembers) {
        return NextResponse.json(
            { error: 'Workspace not found' },
            { status: 404 },
        );
    }

    return NextResponse.json(workspaceMembers);
}
