import { db } from "../_utils/db";

export const NotificationService = {
    async createNotification(userId: string, title: string, message: string) {
      return await db.notification.create({
        data: { userId, title, message },
      });
    },
  
    async getUserNotifications(userId: string) {
      return await db.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
    },
  
    async markAsRead(notificationId: string) {
      return await db.notification.update({
        where: { id: notificationId },
        data: { isRead: true },
      });
    },
  };