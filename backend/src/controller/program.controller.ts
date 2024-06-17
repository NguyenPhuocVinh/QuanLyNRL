import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ProgramService } from '../services/program.service';
import { CreateProgramRequest } from '../types/request.type';
import { ApiError } from '../utils/api-error.util';

export class ProgramController {
    static async createProgram(req: Request, res: Response) {
        try {
            const createProgramRequest: CreateProgramRequest = req.body;
            if (!createProgramRequest) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid request');
            }
            const program = await ProgramService.createProgram(createProgramRequest);
            res.status(StatusCodes.CREATED).json(program);
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    static async getPrograms(req: Request, res: Response) {
        try {
            const programs = await ProgramService.getPrograms();
            res.status(StatusCodes.OK).json(programs);
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    static async updateProgram(req: Request, res: Response) {
        try {
            const { programId } = req.query;
            const updateProgramRequest = req.body;
            if (!updateProgramRequest) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid request');
            }
            const program = await ProgramService.updateProgram(programId, updateProgramRequest);
            res.status(StatusCodes.OK).json(program);
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    static async approveProgram(req: Request, res: Response) {
        try {
            const { programId } = req.query;
            const program = await ProgramService.approveProgram(programId);
            res.status(StatusCodes.OK).json(program);
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    static async getProgramById(req: Request, res: Response) {
        try {
            const { programId } = req.query;
            const program = await ProgramService.getProgramById(programId);
            res.status(StatusCodes.OK).json(program);
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}