import mongoose from 'mongoose';
import { userNotificationModel } from '../types/notification.type';

interface userNotificationModelDocument extends userNotificationModel, mongoose.Document {}
export const UserNotification = mongoose.model<userNotificationModelDocument>('UserNotification', new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    notificationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Notification'},
    isRead: { type: Boolean, default: false }
}))