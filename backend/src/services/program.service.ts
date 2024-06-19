import { StatusCodes } from 'http-status-codes';
import { Program } from '../models/program.model';
import { ApiError } from '../utils/api-error.util';
import { CreateProgramRequest } from '../types/request.type';
import { UpdateProgramRequest, UpdateRequest } from '../types/request.type';
import { programModel } from '../types/program.type';
import cloudinary from '../config/cloudinary.config';

export class ProgramService {

    static async createProgram(createProgramRequest: CreateProgramRequest, imagePath: any) {
        const uploadedImage = await cloudinary.uploader.upload(imagePath, {
            folder: "NRL/Programs",
        });
        if (!uploadedImage || !uploadedImage.url) {
            throw new Error("Failed to upload image to Cloudinary");
        } 
        const newProgram = Program.create({
            ...createProgramRequest,
            image: uploadedImage.url
        });
        return newProgram;
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

    static async deleteProgram(programId: any) {
        return Program.findByIdAndDelete(programId);
    }

    static async getProgramsByStatus(status: any) {
        const programs = await Program.find({ status });
        if (!programs) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Programs not found');
        }
        return programs;
    }

    static async joinProgram(programId: any) {
        const program = await Program.findById(programId) as programModel;
        if (!program) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Program not found');
        }
        
        if (parseInt(program.quantity) == 0) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Program is enough');
        }
        if(program.registerDate > new Date()) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Program is not available');
        }
        program.quantity = (parseInt(program.quantity) - 1).toString();

        return await Program.updateOne({ _id: programId }, { quantity: program.quantity });
    }

    static async getPointProgram(programId: any) {
        const program = await Program.findById(programId);
        if (!program) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Program not found');
        }
        return program.point;
    }
}