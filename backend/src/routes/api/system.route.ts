import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { checkPermission, ROLE_LIST } from '../../middlewares/permission.middleware';
import { SystemController } from '../../controller/system.controller';

const systemRouter = express.Router();

systemRouter.post('/register-admin', SystemController.registerAdmin);
systemRouter.post('/login-admin', SystemController.loginAdmin);
systemRouter.get('/get-all-user', authMiddleware, checkPermission([ROLE_LIST.SUPERADMIN]), SystemController.getAllUser);
systemRouter.put('/update-user', authMiddleware, checkPermission([ROLE_LIST.SUPERADMIN]), SystemController.updateUser);
systemRouter.delete('/delete-user', authMiddleware, checkPermission([ROLE_LIST.SUPERADMIN]), SystemController.deleteUser);

export default systemRouter