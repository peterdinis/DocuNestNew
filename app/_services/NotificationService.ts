import { db } from '../_utils/db';

export const NotificationService = {
    async getUserNotifications(userId: string, page: number = 1, limit: number = 10) {
        return await db.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
        });
    },

    async removeNotification(notificationId: string) {
        return await db.notification.delete({
            where: {
                id: notificationId
            }
        })
    }
};
