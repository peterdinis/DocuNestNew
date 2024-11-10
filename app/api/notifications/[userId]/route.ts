import { db } from '@/app/_utils/db';
import { NextRequest, NextResponse } from 'next/server';

// GET method to fetch notifications by userId
export async function GET(
    req: NextRequest,
    { params }: { params: { userId: string } },
) {
    try {
        const notifications = await db.notification.findMany({
            where: {
                userId: params.userId,
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

// DELETE method to remove all notifications for a user
export async function DELETE(
    req: NextRequest,
    { params }: { params: { userId: string } },
) {
    try {
        const deletedNotifications = await db.notification.deleteMany({
            where: {
                userId: params.userId,
            },
        });
        return NextResponse.json(deletedNotifications);
    } catch (error) {
        return NextResponse.json(
            { error: 'Error deleting notifications' },
            { status: 500 },
        );
    }
}