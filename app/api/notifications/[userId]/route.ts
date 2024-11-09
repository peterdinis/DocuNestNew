import { db } from '@/app/_utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    {
        params,
    }: {
        params: { userId: string };
    },
) {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);

    try {
        const notifications = await db.notification.findMany({
            where: { userId: params.userId },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        });

        const totalCount = await db.notification.count({
            where: { userId: params.userId },
        });

        return NextResponse.json({
            notifications,
            totalPages: Math.ceil(totalCount / limit),
        });
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
