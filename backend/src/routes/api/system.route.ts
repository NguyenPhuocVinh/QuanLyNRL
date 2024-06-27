import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { checkPermission, ROLE_LIST } from '../../middlewares/permission.middleware';
import { SystemController } from '../../controller/system.controller';

const systemRouter = express.Router();

systemRouter.post('/register', SystemController.registerAdmin);
systemRouter.post('/login', SystemController.loginAdmin);
systemRouter.get('/get-all-user', authMiddleware, checkPermission([ROLE_LIST.SUPERADMIN]), SystemController.getAllUser);
systemRouter.put('/update-user', authMiddleware, checkPermission([ROLE_LIST.SUPERADMIN]), SystemController.updateUser);
systemRouter.delete('/delete-user', authMiddleware, checkPermission([ROLE_LIST.SUPERADMIN]), SystemController.deleteUser);
systemRouter.get('/get-user-by-id', authMiddleware, checkPermission([ROLE_LIST.SUPERADMIN]), SystemController.getUserById);

export default systemRouter