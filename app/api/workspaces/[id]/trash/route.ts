import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/_utils/db';
import authOptions from '@/app/api/auth/authOptions';

export async function PUT(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

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

    const moveWorkspaceToTrash = await db.workspace.update({
        where: {
            id
        },

        data: {
            inTrash: true
        }
    });

    if(!moveWorkspaceToTrash) {
        throw new Error("Failed to move workspace to trash")
    }

    return NextResponse.json(moveWorkspaceToTrash);
}
