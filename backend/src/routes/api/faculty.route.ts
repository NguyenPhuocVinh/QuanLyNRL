import express from 'express';
import { FacultyController } from '../../controller/faculty.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { checkPermission, ROLE_LIST } from '../../middlewares/permission.middleware';

const facultyRouter = express.Router();

facultyRouter.post('/create-faculty', checkPermission([ROLE_LIST.SUPERADMIN]), FacultyController.createFaculty);
facultyRouter.get('/get-faculties', FacultyController.getFaculties);
facultyRouter.get('/get-faculty/:facultyId', checkPermission([ROLE_LIST.SUPERADMIN]), FacultyController.getFaculty);
facultyRouter.put('/update-faculty', checkPermission([ROLE_LIST.SUPERADMIN]), FacultyController.updateFaculty);


export default facultyRouter;