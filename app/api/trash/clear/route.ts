import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { db } from '@/app/_utils/db';
import authOptions from '../../auth/authOptions';

export async function DELETE() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    await db.workspace.deleteMany({
        where: {
            userId: session.user.id,
        },
    });

    return NextResponse.json({
        message: 'Trash was cleaned',
    });
}
