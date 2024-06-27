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

    static async getProgramsSortRegisterDate() {
        const program = Program.find();
        program.sort({ registerDate: 1 });
        return program;
    }

    static async joinProgram(programId: any) {
        const program = await Program.findById(programId);
        if (!program) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Program not found');
        }

        // Kiểm tra nếu chương trình đã hết số lượng đăng ký
        if (parseInt(program.quantity) === 0) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Program is full');
        }

        // Kiểm tra nếu ngày hiện tại trước ngày đăng ký của chương trình
        const currentDate = new Date();
        if (currentDate < new Date(program.registerDate)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Program registration is not open yet');
        }

        // Kiểm tra nếu ngày hiện tại sau ngày đăng ký của chương trình
        if (currentDate > new Date(program.startDate)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Program registration has closed');
        }

        // Kiểm tra nếu chương trình chưa được phê duyệt
        if (program.status !== 'APPROVED') {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Program is not approved');
        }

        // Giảm số lượng còn lại của chương trình đi 1 và lưu lại vào cơ sở dữ liệu
        program.quantity = (parseInt(program.quantity) - 1).toString();
        await Program.updateOne({ _id: programId }, { quantity: program.quantity });

        // Trả về thông tin chương trình sau khi đã cập nhật
        return program;
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

    static async rejectProgram(programId: any) {
        const program = await Program.findById(programId);
        if (!program) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Program not found');
        }
        program.status = 'REJECTED';
        return await program.save();
    }
}