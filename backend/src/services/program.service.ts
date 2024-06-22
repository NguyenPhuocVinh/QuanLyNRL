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
        const program = await Program.findById(programId);
        if (!program) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Program not found');
        }

        if (parseInt(program.quantity) == 0) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Program is full');
        }

        if (new Date(program.registerDate) > new Date()) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Program registration is not open yet');
        }

        if (program.status !== 'APPROVED') {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Program is not approved');
        }

        program.quantity = (parseInt(program.quantity) - 1).toString();

        await Program.updateOne({ _id: programId }, { quantity: program.quantity });
        return program; // Return the program to ensure it's being passed correctly
    }

    static async getPointProgram(programId: any) {
        const program = await Program.findById(programId);
        if (!program) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Program not found');
        }
        return program.point;
    }

    static async getPublicPrograms() {
        const program =  Program.find({ status: 'APPROVED'});
        program.sort({ createdAt: -1 });
        return program;
    }
}