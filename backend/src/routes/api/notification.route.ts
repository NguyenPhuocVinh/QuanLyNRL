import express from 'express';
import { NotificationController } from '../../controller/notification.controller';
import { checkPermission, ROLE_LIST } from '../../middlewares/permission.middleware';

const notificationRouter = express.Router();

notificationRouter.post('/send-notification', checkPermission([ROLE_LIST.ADMIN, ROLE_LIST.SUPERADMIN]), NotificationController.SendNotification);
notificationRouter.get('/get-notification', NotificationController.GetNotification);
notificationRouter.put('/mark-as-read/:notificationId', NotificationController.MarkNotificationAsRead);

export default notificationRouter;