import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/api-error.util';
import { JoinProgramService } from '../services/join-program.service';
import { UserService } from '../services/user.service';

export class JoinProgramController {
    static async createJoinProgram ( req: Request, res: Response ) {
        try {
            const MSSV = req.user.MSSV;
            const programId = req.params.programId;
            const joinProgram = await JoinProgramService.createJoinProgram(MSSV, programId);
            return res.status(StatusCodes.CREATED).json({joinProgram});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message})
        }
    }

    static async getJoinPrograms ( req: Request, res: Response ) {
        try {
            const joinPrograms = await JoinProgramService.getJoinPrograms();
            return res.status(StatusCodes.OK).json({joinPrograms});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message})
        }
    }

    static async getJoinProgramById ( req: Request, res: Response ) {
        try {
            const joinProgramId = req.params.joinProgramId;
            const joinProgram = await JoinProgramService.getJoinProgramById(joinProgramId);
            return res.status(StatusCodes.OK).json(joinProgram);
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message})
        }
    }

    static async attendanceJoinProgram ( req: Request, res: Response ) {
        try {
            const MSSV = req.body.MSSV as String;
            const programId = req.params.programId as String;
            const joinProgram = await JoinProgramService.attendanceJoinProgram(MSSV, programId);
            return res.status(StatusCodes.OK).json({joinProgram});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message})
        }
    }

    static async getJoinProgramByProgramId ( req: Request, res: Response ) {
        try {
            const programId = req.params.programId;
            const joinProgram = await JoinProgramService.getListJoinProgramByProgramId(programId);
            return res.status(StatusCodes.OK).json({joinProgram});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message})
        }
    }

    static async getJoinProgramByMSSV ( req: Request, res: Response ) {
        try {
            const MSSV = req.user.MSSV as String;
            const programs = await JoinProgramService.getJoinProgramByMSSV(MSSV);
            return res.status(StatusCodes.OK).json({programs});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message})
        }
    }

    static async asbsentJoinProgram ( req: Request, res: Response ) {
        try {
            const MSSV = req.body.MSSV as String;
            const programId = req.params.programId as String;
            const joinProgram = await JoinProgramService.absentProgram(MSSV, programId);
            return res.status(StatusCodes.OK).json({joinProgram});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message})
        }
    }

    static async getLisgetListJoinProgramByProgramId ( req: Request, res: Response ) {
        try {
            const programId = req.params.programId;
            const joinProgram = await JoinProgramService.getListJoinProgramByProgramId(programId);
            return res.status(StatusCodes.OK).json({joinProgram});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message})
        }
    }

    static async findJoinProgramByMSSVAndProgramId ( req: Request, res: Response ) {
        try {
            const programId = req.query.programId as string;
            const MSSV = req.query.MSSV as string;
            const listUser = await JoinProgramService.findJoinProgramByMSSVAndProgramId(MSSV, programId);
            return res.status(StatusCodes.OK).json({listUser});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message})
        }
    }
    
}