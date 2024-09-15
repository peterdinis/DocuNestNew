import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import authOptions from '../../auth/authOptions';
import { db } from '@/app/_utils/db';

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    const url = new URL(request.url);
    const query = url.searchParams.get('query') || '';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = 10;

    const allPaginatedWorkspaces = await db.workspace.findMany({
        where: {
            userId: session.user.id,
            name: {
                contains: query,
                mode: 'insensitive',
            },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const totalWorkspaces = await db.workspace.count({
        where: {
            userId: session.user.id,
            name: {
                contains: query,
                mode: 'insensitive',
            },
        },
    });

    if (!allPaginatedWorkspaces) {
        throw new Error('User does not create any documents');
    }

    return NextResponse.json({
        workspaces: allPaginatedWorkspaces,
        totalPages: Math.ceil(totalWorkspaces / pageSize),
    });
}
