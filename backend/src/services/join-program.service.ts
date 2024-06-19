import { StatusCodes } from 'http-status-codes';
import { JoinProgram } from '../models/join-program.model';
import { UserService } from './user.service';
import { ApiError } from '../utils/api-error.util';
import { ProgramService } from './program.service';
import { getInfoData } from '../utils/filter.util';

export class JoinProgramService {
    static async createJoinProgram(userId: any, programId: any) {
        const MSSV = await UserService.getMSSVByUserId(userId);

        const checkJoined = await JoinProgram.findOne({ programId, MSSV });
        if (checkJoined) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'You have already joined this program');
        }

        const registrationDate = new Date();
        await ProgramService.joinProgram(programId);
        
        const joinProgram = await JoinProgram.create({
            programId,
            MSSV,
            status: 'REGISTERED',
            registrationDate,
            joiningDate: null,
        });

        return joinProgram;
    }

    static async getJoinPrograms() {
        return JoinProgram.find();
    }

    static async getJoinProgramById(joinProgramId: any) {
        const joinProgram = await JoinProgram.findById(joinProgramId);
        if (!joinProgram) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Join Program not found');
        }
        return joinProgram;
    }

    static async getJoinProgramByProgramId(programId: any) {
        const joinProgram = await JoinProgram.find({ programId });
        if (!joinProgram) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Join Program not found');
        }
        return joinProgram;
    }

    static async checkAttendance(MSSV: String, programId: String) {
        const program = await JoinProgram.findOne({ MSSV, programId });
        if (!program) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Join Program not found');
        }
        if(program.status === 'ATTENDED') {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'You have already attended this program');
        }
    }

    static async attendanceJoinProgram(MSSV: String, programId: String) {
        await this.checkAttendance(MSSV, programId);
        const program = await ProgramService.getProgramById(programId);
        if (!program) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Program not found');
        }
        const joinProgram = await JoinProgram.findOne({ MSSV, programId });
        if (!joinProgram) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Join Program not found');
        }
        joinProgram.status = 'ATTENDED';
        joinProgram.joiningDate = new Date();
        await joinProgram.save();
        const updatePointByMSSV = await UserService.updatePointByMSSV(MSSV, program.point);
        const infoData = getInfoData({
            filed: ['_id', 'MSSV', 'fullName', 'point', 'createdAt'],
            object: updatePointByMSSV
        });
        return { joinProgram, infoData };
    }

    static async getJoinProgramByMSSV(MSSV: String) {
        const joinPrograms = await JoinProgram.find({ MSSV });
        if (!joinPrograms) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Join Program not found');
        }
        return joinPrograms;
    }

}
