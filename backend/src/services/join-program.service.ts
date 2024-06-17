import { StatusCodes } from 'http-status-codes';
import { JoinProgram } from '../models/join-program.model';
import { UserService } from './user.service';

export class JoinProgramService {
    static async createJoinProgram(userId: any, programId: String) {
        const MSSV = await UserService.getMSSVByUserId(userId);
        const registrationDate = new Date();
        const joinProgram = await JoinProgram.create({
            programId,
            MSSV,
            status: 'REGISTERED',
            registrationDate,
            joiningDate: null,
        });
        return joinProgram;
    }
}
