import express from 'express';
import { checkPermission, ROLE_LIST } from '../../middlewares/permission.middleware';
import { CategoryController } from '../../controller/category.controller';

const categoryRouter = express.Router();

categoryRouter.post('/create-category', checkPermission([ROLE_LIST.SUPERADMIN]), CategoryController.createCategory);
categoryRouter.get('/get-categories', CategoryController.getCategories);

export default categoryRouter;