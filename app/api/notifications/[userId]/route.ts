import { db } from '@/app/_utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { userId: string; page: number; limit: number } },
) {
    try {
        const notifications = await db.notification.findMany({
            where: { userId: params.userId },
            orderBy: { createdAt: 'desc' },
            skip: (params.page - 1) * params.limit,
            take: params.limit,
        });
        return NextResponse.json(notifications);
    } catch (error) {
        return NextResponse.json(
            { error: 'Error fetching notifications' },
            { status: 500 },
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { userId: string } },
) {
    try {
        const notifications = await db.notification.delete({
            where: {
                id: params.userId,
            },
        });
        return NextResponse.json(notifications);
    } catch (error) {
        return NextResponse.json(
            { error: 'Error fetching notifications' },
            { status: 500 },
        );
    }
}
