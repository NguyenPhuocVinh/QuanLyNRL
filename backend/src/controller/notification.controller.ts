import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import fs from 'fs';
import { ApiError } from '../utils/api-error.util';
import { NotificationService } from '../services/notification.service';
import { CreateNotificationRequest } from '../types/request.type';
import { multipleUploadFile } from '../utils/upload.util';

export class NotificationController {
    static async SendNotification(req: Request, res: Response) {
        multipleUploadFile(req, res, async (err: any) => {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
            }
            try {
                const createNotificationRequest: CreateNotificationRequest = req.body;
                if (!createNotificationRequest) {
                    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid request');
                }
                const attachUris = req.files?.map((file: any) => file.path);
                // if (!attachUris || attachUris.length === 0) {
                //     throw new ApiError(StatusCodes.BAD_REQUEST, 'No files uploaded');
                // }
                const notification = await NotificationService.createNotification(createNotificationRequest, attachUris);
                await NotificationService.sendNotificationToUser(notification._id as string);


                res.status(StatusCodes.CREATED).json({ notification });
            } catch (error: any) {
                res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
            }
        });
    }

    static async MarkNotificationAsRead(req: Request, res: Response) {
        try {
            const userId = req.user?._id;
            const notificationId = req.params.notificationId;
            const userNotification = await NotificationService.markNotificationAsRead(userId, notificationId);
            res.status(StatusCodes.OK).json({ userNotification });
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    static async GetNotification(req: Request, res: Response) {
        try {
            const userId = req.user?._id;
            const userNotifications = await NotificationService.getNotificationByUserId(userId);
            res.status(StatusCodes.OK).json({ userNotifications });
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}