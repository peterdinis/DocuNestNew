import { NotificationService } from '@/app/_services/NotificationService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { userId, title, message } = await req.json();
    try {
        const notification = await NotificationService.createNotification(
            userId,
            title,
            message,
        );
        return NextResponse.json(notification);
    } catch (error) {
        return NextResponse.json(
            { error: 'Error creating notification' },
            { status: 500 },
        );
    }
}
