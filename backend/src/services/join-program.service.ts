import { StatusCodes } from 'http-status-codes';
import { JoinProgram } from '../models/join-program.model';
import { UserService } from './user.service';
import { ApiError } from '../utils/api-error.util';
import { ProgramService } from './program.service';
import { getInfoData } from '../utils/filter.util';

export class JoinProgramService {
    static async createJoinProgram(MSSV: String, programId: any) {

        const checkJoined = await JoinProgram.findOne({ programId, MSSV });
        if (checkJoined) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'You have already joined this program');
        }


        const registrationDate = new Date();
        const program = await ProgramService.joinProgram(programId);
        if(!program) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Program not found');
        }
        
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

        if (!joinPrograms || joinPrograms.length === 0) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Join Programs not found for the given MSSV');
        }
    
        // Fetch program details for each join program
        const programs = await Promise.all(joinPrograms.map(async (joinProgram) => {
            const program = await ProgramService.getProgramById(joinProgram.programId);
            return {
                ...joinProgram.toObject(),
                programDetails: program
            };
        }));
    
        return programs;
    }

    static async checkRegistered(MSSV: String, programId: String) {
        const program = await JoinProgram.findOne({ MSSV, programId });
        return program && program.status === 'REGISTERED';
    }

    static async updateStatusJoinProgram (programId: any) {
        const joinProgram = await JoinProgram.findOneAndUpdate({ programId: programId }, { status: 'FINISH' }, { new: true });
        if (!joinProgram) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Join Program not found');
        }
        return joinProgram;
    } 

    static async absentProgram(MSSV: String, programId: String) {
        // Check if attendance record exists
        await this.checkAttendance(MSSV, programId);
        
        // Get the program details
        const program = await ProgramService.getProgramById(programId);
        if (!program) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Program not found');
        }
        
        // Find the join program record
        const joinProgram = await JoinProgram.findOne({ MSSV, programId });
        if (!joinProgram) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Join Program not found');
        }
        
        // Update the status to 'ABSENT' and set the date
        joinProgram.status = 'ABSENT';
        joinProgram.joiningDate = new Date();
        await joinProgram.save();
        
        // Update the user's points accordingly (assumption: subtract points for absence)
        const updatePointByMSSV = await UserService.updatePointByMSSV(MSSV, -program.point);
        
        // Extract the relevant info data
        const infoData = getInfoData({
            filed: ['_id', 'MSSV', 'fullName', 'point', 'createdAt'],
            object: updatePointByMSSV
        });
        
        // Return the updated join program and user info data
        return { joinProgram, infoData };
    }
    

}
