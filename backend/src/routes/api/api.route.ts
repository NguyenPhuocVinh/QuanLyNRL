import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import authRouter from './auth.route';
import systemRouter from './system.route';
import facultyRouter from './faculty.route';
import programRouter from './program.route';
import categoryRouter from './category.route';
import userRouter from './user.route';
import joinProgramRouter from './join-program.route';
import proposeRouter from './propose.route';
import notificationRouter from './notification.route';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/system', systemRouter);
apiRouter.use('/faculty', authMiddleware, facultyRouter);
apiRouter.use('/program', authMiddleware, programRouter);
apiRouter.use('/category', authMiddleware, categoryRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/join-program', authMiddleware, joinProgramRouter);
apiRouter.use('/propose', authMiddleware, proposeRouter);
apiRouter.use('/notification', authMiddleware, notificationRouter);


export default apiRouter;
