import express from 'express';
import { ProgramController } from '../../controller/program.controller';
import { JoinProgramController } from '../../controller/join-program.controller';
import { checkPermission, ROLE_LIST } from '../../middlewares/permission.middleware';


const programRouter = express.Router();

programRouter.post('/create-program', checkPermission([ROLE_LIST.SUPERADMIN, ROLE_LIST.ADMIN]), ProgramController.createProgram);
// programRouter.post('/join-program', JoinProgramController.createJoinProgram);
programRouter.get('/get-all-program', checkPermission([ROLE_LIST.SUPERADMIN, ROLE_LIST.ADMIN]), ProgramController.getPrograms);
programRouter.get('/get-program/:programId', ProgramController.getProgramById);
programRouter.get('/get-program-sort-register-date', ProgramController.getProgramsSortRegisterDate);
programRouter.put('/update-program/:programId', checkPermission([ROLE_LIST.ADMIN]), ProgramController.updateProgram);
programRouter.put('/approve-program/:programId', checkPermission([ROLE_LIST.SUPERADMIN]), ProgramController.approveProgram);
programRouter.get('/get-public-programs', ProgramController.getPublicPrograms);
programRouter.put('/reject-program/:programId', checkPermission([ROLE_LIST.SUPERADMIN]), ProgramController.rejectProgram);



export default programRouter;