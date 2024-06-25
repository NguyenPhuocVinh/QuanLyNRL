import express from 'express';
import { ProposeController } from '../../controller/propose.controller';
import { checkPermission, ROLE_LIST } from '../../middlewares/permission.middleware';

const proposeRouter = express.Router();

proposeRouter.post('/create-propose', ProposeController.createPropose);
proposeRouter.put('/approve-propose/:proposeId', checkPermission([ROLE_LIST.SUPERADMIN]), ProposeController.approvePropose);
proposeRouter.get('/get-all-proposes', checkPermission([ROLE_LIST.SUPERADMIN, ROLE_LIST.ADMIN]), ProposeController.getAllPropose);
proposeRouter.get('/get-propose-by-mssv', ProposeController.getProposeByMSSV);
proposeRouter.put('/reject-propose/:proposeId', checkPermission([ROLE_LIST.SUPERADMIN]), ProposeController.rejectPropose);

export default proposeRouter;