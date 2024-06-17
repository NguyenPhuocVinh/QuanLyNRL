import { StatusCodes } from 'http-status-codes';
import { Program } from '../models/program.model';
import { ApiError } from '../utils/api-error.util';
import { CreateProgramRequest } from '../types/request.type';
import { UpdateProgramRequest, UpdateRequest } from '../types/request.type';

export class ProgramService {
    static async createProgram(createProgramRequest: CreateProgramRequest) {
        const program = new Program(createProgramRequest);
        return await program.save();
    }

    static async getPrograms() {
        return Program.find();
    }

    static async updateProgram(programId: any, updateProgramRequest: UpdateRequest<UpdateProgramRequest>) {
        const program = await Program.findById(programId);
        if (!program) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Program not found');
        }
        Object.keys(updateProgramRequest).forEach((key) => {
            const prop = key as keyof UpdateProgramRequest;
            if (updateProgramRequest[prop] !== undefined) {
                // @ts-ignore
                program[prop] = updateProgramRequest[prop];
            }
        });
        return await program.save();
    }

    static async approveProgram(programId: any) {
        const program = await Program.findById(programId);
        if (!program) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Program not found');
        }
        program.status = 'APPROVED';
        return await program.save();
    }

    static async getProgramById(programId: any) {
        return Program.findById(programId);
    }
}