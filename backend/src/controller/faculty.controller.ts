import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { FacultyService } from '../services/faculty.service';
import { ApiError } from '../utils/api-error.util';

export class FacultyController {
    static async createFaculty(req: Request, res: Response) {
        try {
            const { facultyName, description } = req.body;
            if (!facultyName || !description) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing required fields');
            }
            const faculty = await FacultyService.createFaculty(facultyName, description);
            res.status(StatusCodes.CREATED).json({ faculty });
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    static async getFaculties(req: Request, res: Response) {
        try {
            const faculties = await FacultyService.getFaculties();
            res.status(StatusCodes.OK).json({ faculties });
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    static async getFaculty(req: Request, res: Response) {
        try {
            const { facultyId } = req.params;
            const faculty = await FacultyService.getFaculty(facultyId);
            res.status(StatusCodes.OK).json(faculty);
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    static async updateFaculty(req: Request, res: Response) {
        try {
            const { facultyId } = req.query as { facultyId: string };
            const { facultyName, description } = req.body;
            if (!facultyName || !description) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing required fields');
            }
            const faculty = await FacultyService.updateFaculty(facultyId, facultyName, description);
            res.status(StatusCodes.OK).json({ faculty });
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}