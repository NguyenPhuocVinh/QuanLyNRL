import express from 'express';
import { ProposeController } from '../../controller/propose.controller';

const proposeRouter = express.Router();

proposeRouter.post('/create-propose', ProposeController.createPropose);

export default proposeRouter;