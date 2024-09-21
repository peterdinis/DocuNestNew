import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../../auth/authOptions';
import { db } from '@/app/_utils/db';

export async function GET(request: NextRequest) {
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

    const findOneWorkspaceDocument = await db.workspaceDocument.findUnique({
        where: {
            id,
            userId: session.user.id,
        },
    });

    if (!findOneWorkspaceDocument) {
        throw new Error('Workspace document not found');
    }

    return NextResponse.json(findOneWorkspaceDocument);
}


export async function DELETE(request: NextRequest) {
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

    const findOneWorkspaceDocument = await db.workspaceDocument.findUnique({
        where: {
            id,
            userId: session.user.id,
        },
    });

    if (!findOneWorkspaceDocument) {
        throw new Error('Workspace document not found');
    }

    const deleteOneSpecificDocument = await db.workspaceDocument.delete({
        where: {
            id: findOneWorkspaceDocument.id,
            userid: session.user.id
        }
    });

    if(!deleteOneSpecificDocument) {
        throw new Error("Failed to delete workspace document");
    }

    return deleteOneSpecificDocument;

}