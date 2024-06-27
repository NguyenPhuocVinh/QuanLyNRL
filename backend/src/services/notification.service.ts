import { Notification } from '../models/notification.model';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/api-error.util';
import { CreateNotificationRequest } from '../types/request.type';
import { UserService } from './user.service';
import cloudinary from '../config/cloudinary.config';
import { UserNotification } from '../models/user-notification.model';
import { NotificationModel } from '../types/notification.type';
import fs from 'fs/promises';


export class NotificationService {
    static async createNotification(createNotificationRequest: CreateNotificationRequest, attachUris: string[]) {
        try {
            const uploadedFiles = await Promise.all(
                attachUris.map(async (attachUri) => {
                    try {
                        const result = await cloudinary.uploader.upload(attachUri, {
                            folder: "NRL/Notifications",
                        });
                        return result.secure_url;
                    } catch (error) {
                        console.error(`Error uploading file ${attachUri}:`, error);
                        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Failed to upload file: ${attachUri}`);
                    }
                })
            );

            const newNotification = await Notification.create({
                ...createNotificationRequest,
                attach: uploadedFiles,
            });

            await Promise.all(attachUris.map(async (filePath) => {
                try {
                    await fs.unlink(filePath);
                } catch (error) {
                    console.error(`Error deleting file ${filePath}:`, error);
                }
            }));

            return newNotification;
        } catch (error) {
            console.error(`Error creating notification:`, error);
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create notification');
        }
    }

    static async sendNotificationToUser (notificationId: string) {
        const users = await UserService.getAllUser();
        const userNotifications = users.map(user => {
            return {
                userId: user._id,
                notificationId: notificationId,
            }
        });
        await UserNotification.insertMany(userNotifications);
    }

    static async markNotificationAsRead(userId: string, notificationId: string) {
        const userNotification = await UserNotification.findOneAndUpdate(
            { userId: userId, notificationId: notificationId },
            { isRead: true },
            { new: true }
        )
        return userNotification
    }

    static async getNotificationByUserId(userId: string) {
        const userNotifications = await UserNotification.find({ userId: userId })
            .populate('notificationId')
            .lean() as any []; 
    
        const filteredNotifications = userNotifications.filter(notification => notification.notificationId !== null);
    
        const sortedNotifications = filteredNotifications.sort((a, b) => {
            const dateA = new Date(a.notificationId!.createdAt).getTime();
            const dateB = new Date(b.notificationId!.createdAt).getTime();
            return dateB - dateA; 
        });
    
        return sortedNotifications;
    }
    

}