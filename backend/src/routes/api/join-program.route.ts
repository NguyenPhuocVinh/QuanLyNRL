import express from 'express';
import { JoinProgramController } from '../../controller/join-program.controller';
import { checkPermission, ROLE_LIST } from '../../middlewares/permission.middleware';

const joinProgramRouter = express.Router();

joinProgramRouter.post('/register/:programId', JoinProgramController.createJoinProgram);
joinProgramRouter.get('/get-join-programs', checkPermission([ROLE_LIST.ADMIN, ROLE_LIST.SUPERADMIN]), JoinProgramController.getJoinPrograms);
joinProgramRouter.get('/get-join-program/:programId', checkPermission([ROLE_LIST.ADMIN, ROLE_LIST.SUPERADMIN]), JoinProgramController.getJoinProgramById);
joinProgramRouter.put('/attendance/:programId', checkPermission([ROLE_LIST.ADMIN, ROLE_LIST.SUPERADMIN]), JoinProgramController.attendanceJoinProgram);

export default joinProgramRouter;
