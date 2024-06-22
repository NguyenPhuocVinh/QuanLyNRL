import { Faculty } from '../models/faculty.model';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/api-error.util';

export class FacultyService {
    static async createFaculty(facultyName: string, description: string) {
        const faculty = new Faculty({ facultyName, description });
        return await faculty.save();
    }

    static async getFaculties() {
        return await Faculty.find();
    }

    static async getFaculty(facultyId: string) {
        const faculty = await Faculty.findById(facultyId);
        if (!faculty) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Faculty not found');
        }
        return faculty;
    }

    static async updateFaculty(facultyId: string, facultyName: string, description: string) {
        const faculty = await Faculty.findById(facultyId);
        if (!faculty) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Faculty not found');
        }
        faculty.facultyName = facultyName;
        faculty.description = description;
        return await faculty.save();
    }

    static async deleteFaculty(facultyId: string) {
        return await Faculty.findByIdAndDelete(facultyId);
    }

    static async getFacultyNameById(facultyId: any) {
        const faculty = await Faculty.findById(facultyId);
        return faculty?.facultyName;
    }
}