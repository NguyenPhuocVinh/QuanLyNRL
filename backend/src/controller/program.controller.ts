import { Request, Response } from 'express';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import { ProgramService } from '../services/program.service';
import { CreateProgramRequest, UpdateProgramRequest } from '../types/request.type';
import { ApiError } from '../utils/api-error.util';
import { singleUpload } from '../utils/upload.util';
import { ProgramStatus } from '../types/program.type';

export class ProgramController {
    static async createProgram(req: Request, res: Response) {
        singleUpload(req, res, async (err: any) => {
            if ( err ) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
            }
            try {
                const createProgramRequest: CreateProgramRequest = req.body;
                if (!createProgramRequest) {
                    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid request');
                }
                const { path: imagePath } = req.file;
                const program = await ProgramService.createProgram(createProgramRequest, imagePath);   
                fs.unlinkSync(imagePath);
                res.status(StatusCodes.CREATED).json({program});
            } catch (error: any) {
                res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
            }
        });
    }

    static async getPrograms(req: Request, res: Response) {
        try {
            const programs = await ProgramService.getPrograms();
            res.status(StatusCodes.OK).json({programs});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    static async updateProgram(req: Request, res: Response) {
        try {
            const { programId } = req.params;
            const updateProgramRequest: UpdateProgramRequest = req.body;
            if (!updateProgramRequest) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid request');
            }
            const program = await ProgramService.updateProgram(programId, updateProgramRequest);
            res.status(StatusCodes.OK).json({program});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    static async approveProgram(req: Request, res: Response) {
        try {
            const { programId } = req.params;
            const program = await ProgramService.approveProgram(programId);
            res.status(StatusCodes.OK).json({program});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    static async getProgramById(req: Request, res: Response) {
        try {
            const { programId } = req.params;
            const program = await ProgramService.getProgramById(programId);
            res.status(StatusCodes.OK).json({program});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    static async getProgramsSortRegisterDate(req: Request, res: Response) {
        try {
            const programs = await ProgramService.getProgramsSortRegisterDate();
            res.status(StatusCodes.OK).json({programs});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    static async getPublicPrograms(req: Request, res: Response) {
        try {
            const programs = await ProgramService.getPublicPrograms();
            res.status(StatusCodes.OK).json({programs});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    static async rejectProgram(req: Request, res: Response) {
        try {
            const { programId } = req.params;
            const program = await ProgramService.rejectProgram(programId);
            res.status(StatusCodes.OK).json({program});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}