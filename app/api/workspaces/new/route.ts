import { db } from '@/app/_utils/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import authOptions from '../../auth/authOptions';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 },
            );
        }

        const { name, workspaceEmoji, description } = await req.json();

        const user = await db.user.findUnique({
            where: {
                id: session.user.id,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        const createNewWorkspace = await db.workspace.create({
            data: {
                userId: user!.id,
                name,
                workspaceEmoji,
                description,
            },
        });

        await axios.post('/api/notifications', {
            userId: user!.id,
            title: 'New document',
            message: `New workspace was created ${createNewWorkspace.name}`,
        });
        if (!createNewWorkspace) {
            return new NextResponse('Failed to create workspace', {
                status: 500,
            });
        }

        revalidatePath('/dashboard');

        return NextResponse.json(createNewWorkspace, { status: 201 });
    } catch (error) {
        return new NextResponse('Server error', { status: 500 });
    }
}
