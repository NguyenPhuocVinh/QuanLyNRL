import express from 'express';
import { UserController } from '../../controller/user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';


const userRouter = express.Router();

userRouter.post('/forgot-password', UserController.forgotPassword);
userRouter.post('/login-by-otp', UserController.loginByOTP);
userRouter.post('/change-password', authMiddleware, UserController.changePassword);

export default userRouter;