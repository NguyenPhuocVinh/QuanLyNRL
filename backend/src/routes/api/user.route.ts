import express from 'express';
import { UserController } from '../../controller/user.controller';
import { JoinProgramController } from '../../controller/join-program.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';


const userRouter = express.Router();

userRouter.post('/forgot-password', UserController.forgotPassword);
userRouter.post('/login-by-otp', UserController.loginByOTP);
userRouter.put('/change-password', authMiddleware, UserController.changePassword);
userRouter.get('/get-history', authMiddleware, JoinProgramController.getJoinProgramByMSSV);
userRouter.get('/get-information', authMiddleware, UserController.getInformation);
userRouter.put('/reset-password', authMiddleware, UserController.resetPassword);
userRouter.put('/update-information', authMiddleware, UserController.updateInformation);

export default userRouter;