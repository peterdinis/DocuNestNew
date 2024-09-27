import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/_utils/db';
import authOptions from '@/app/api/auth/authOptions';

export async function PUT(request: NextRequest) {
    const url = new URL(request.url);
    const pathnameParts = url.pathname.split('/');

    // Assuming the id is the second-to-last segment (before "trash")
    const id = pathnameParts[pathnameParts.length - 2]; 

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

    const findWorkspace = await db.workspace.findFirst({
        where: {
            id,
        },
    });

    console.log("WORKPSACE", findWorkspace, "ID", url);

    if(!findWorkspace) {
        throw new Error("Workspace not found");
    }

    const moveWorkspaceToTrash = await db.workspace.update({
        where: {
            id: findWorkspace.id
        },

        data: {
            inTrash: true
        }
    })

    if (!moveWorkspaceToTrash) {
        throw new Error('Failed to move workspace to trash');
    }

    return NextResponse.json(moveWorkspaceToTrash);
}
