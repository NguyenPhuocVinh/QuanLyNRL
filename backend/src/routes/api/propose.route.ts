import express from 'express';
import { ProposeController } from '../../controller/propose.controller';
import { checkPermission, ROLE_LIST } from '../../middlewares/permission.middleware';

const proposeRouter = express.Router();

proposeRouter.post('/create-propose', ProposeController.createPropose);
proposeRouter.put('/approve-propose/:proposeId', checkPermission([ROLE_LIST.SUPERADMIN]), ProposeController.approvePropose);

export default proposeRouter;