import { ObjectId } from 'mongoose';
export interface NotificationModel {
    title: String;
    message: String;
    attach: String;
    createdAt: Date;
}

export interface userNotificationModel {
    userId: ObjectId;
    notificationId: ObjectId;
    isRead: Boolean
} 