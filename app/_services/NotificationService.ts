import { db } from '../_utils/db';

/* TODO: Later bring this to endpoints */

export const NotificationService = {
    async getUserNotifications(userId: string) {
        return await db.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
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
