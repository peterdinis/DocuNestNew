import { db } from '@/app/_utils/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import authOptions from '../../auth/authOptions';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 },
            );
        }

        const { name, content, workspaceId } = await req.json();

        const createWorkspaceDocument = await db.workspaceDocument.create({
            data: {
                name,
                content,
                workspaceId
            },
        });

        if (!createWorkspaceDocument) {
            return new NextResponse('Failed to create workspace document', {
                status: 500,
            });
        }

        revalidatePath('/dashboard');

        return NextResponse.json(createWorkspaceDocument, { status: 201 });
    } catch (error) {
        return new NextResponse('Server error', { status: 500 });
    }
}
