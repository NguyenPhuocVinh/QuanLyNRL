import express from 'express';
import { ProgramController } from '../../controller/program.controller';
import { JoinProgramController } from '../../controller/join-program.controller';
import { checkPermission, ROLE_LIST } from '../../middlewares/permission.middleware';

const programRouter = express.Router();

programRouter.post('/create-program', checkPermission([ROLE_LIST.SUPERADMIN, ROLE_LIST.ADMIN]), ProgramController.createProgram);
programRouter.post('/join-program', JoinProgramController.createJoinProgram);
programRouter.get('/get-all-program', ProgramController.getPrograms);
programRouter.get('/get-program', ProgramController.getProgramById);
programRouter.get('/get-programs-by-status', ProgramController.getProgramsByStatus);
programRouter.put('/update-program', checkPermission([ROLE_LIST.ADMIN]), ProgramController.updateProgram);
programRouter.put('/approve-program', checkPermission([ROLE_LIST.SUPERADMIN]), ProgramController.approveProgram);



export default programRouter;