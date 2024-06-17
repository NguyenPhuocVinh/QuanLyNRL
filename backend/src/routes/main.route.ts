import express from 'express';
import apiRouter from './api/api.route';

const mainRouter = express.Router();

mainRouter.use('/api/v1', apiRouter);

export default mainRouter;