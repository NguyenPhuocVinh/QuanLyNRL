import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/api-error.util';
import { JoinProgramService } from '../services/join-program.service';

export class JoinProgramController {
    static async createJoinProgram ( req: Request, res: Response ) {
        try {
            const userId = req.user.userId;
            const programId = req.query.programId as String;
            const joinProgram = await JoinProgramService.createJoinProgram(userId, programId);
            return res.status(StatusCodes.CREATED).json(joinProgram);
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message})
        }
    }
}