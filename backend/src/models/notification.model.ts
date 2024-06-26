import mongoose from 'mongoose';
import { NotificationModel } from '../types/notification.type';

interface NotificationModelDocument extends NotificationModel, mongoose.Document {};
export const Notification = mongoose.model<NotificationModelDocument>('Notification', new mongoose.Schema ({
    title: { type: String, required: true},
    message: { type: String, required: true},
    attach: {type: [String]},
    createdAt: { type: Date, default: Date.now },
}))