import { ObjectId } from 'mongoose';
export interface NotificationModel {
    title: String;
    message: String;
    attach: String;
}

export interface userNotificationModel {
    userId: ObjectId;
    notificationId: ObjectId;
    isRead: Boolean
} 