import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { AuthController } from '../../controller/auth.controller';
import { checkPermission, ROLE_LIST } from '../../middlewares/permission.middleware';


const authRouter = express.Router();

authRouter.post('/register', authMiddleware, checkPermission([ROLE_LIST.SUPERADMIN]), AuthController.register);
authRouter.post('/login', AuthController.login);

export default authRouter;