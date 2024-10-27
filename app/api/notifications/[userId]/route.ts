import { NotificationService } from '@/app/_services/NotificationService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { userId: string } },
) {
    try {
        const notifications = await NotificationService.getUserNotifications(
            params.userId,
        );
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
        const notifications = await NotificationService.removeNotification(
            params.userId,
        );
        return NextResponse.json(notifications);
    } catch (error) {
        return NextResponse.json(
            { error: 'Error fetching notifications' },
            { status: 500 },
        );
    }
}