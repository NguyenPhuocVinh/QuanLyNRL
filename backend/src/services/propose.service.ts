import { Propose } from '../models/propose.model';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/api-error.util';
import { CreateProposeRequest } from '../types/request.type';
import cloudinary from '../config/cloudinary.config';
import { ProgramService } from './program.service';
import { JoinProgramService } from './join-program.service';
import { UserService } from './user.service';

export class ProposeService {
    static async createPropose(MSSV: String, createProposeRequest: CreateProposeRequest, imagePaths: string[]) {
        const uploadedImages = await Promise.all(
            imagePaths.map(imagePath =>
                cloudinary.uploader.upload(imagePath, {
                    folder: "NRL/Proposes",
                })
            )
        );

        const imageUrls = uploadedImages.map(image => {
            if (!image || !image.url) {
                throw new Error("Failed to upload image to Cloudinary");
            }
            return image.url;
        });

        const newPropose = await Propose.create({
            ...createProposeRequest,
            MSSV: MSSV,
            images: imageUrls // Correctly assign image URLs to 'images' field
        });

        return newPropose;
    }

    static async approvePropose(proposeId: String, response: String) {
        const propose = await Propose.findById(proposeId);

        if (!propose) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Propose not found');
        }

        if (propose.status !== 'PENDING') {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Propose has already been approved');
        }

        if (propose.type === 'PROPOSE') {
            const program = await ProgramService.getProgramById(propose.programId);
            if (!program) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Program not found');
            }
            if (program.status === 'APPROVED') {
                if (program.isPropose) {
                    propose.response = response;
                    propose.status = 'APPROVED';
                    const [savedPropose, user] = await Promise.all([
                        propose.save(),
                        JoinProgramService.updateStatusJoinProgram(propose.programId),
                        UserService.updatePointByMSSV(propose.MSSV, program.point)
                    ]);
                    return { propose: savedPropose, user };   
                } else {
                    const isRegistered = await JoinProgramService.checkRegistered(propose.MSSV, propose.programId);
                    if (!isRegistered) {
                        throw new ApiError(StatusCodes.BAD_REQUEST, 'You have not registered for this program');
                    }
                    propose.status = 'APPROVED';
                    propose.response = response;

                    const [savedPropose, updatedJoinProgram, user] = await Promise.all([
                        propose.save(),
                        JoinProgramService.updateStatusJoinProgram(propose.programId),
                        UserService.updatePointByMSSV(propose.MSSV, program.point)
                    ]);
                    return { propose: savedPropose, joinProgram: updatedJoinProgram, user };
                }
            } else {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Program is not approved');
            }
        } else {
            propose.status = 'APPROVED';
            propose.response = response;
            return await propose.save();
        }
    }

    static async getAllPropose() {
        return await Propose.find()
    }

    static async getProposeByMSSV(MSSV: String) {
        const proposes = await Propose.find({ MSSV: MSSV });
        const result = await Promise.all(proposes.map(async propose => {
            const program = await ProgramService.getProgramById(propose.programId);
            if (!program) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Program not found');
            }
            return {
                ...propose.toObject(),
                programName: program.programName
            };
        }));
        return result; // Return the result with embedded program names
    }
    

    static async rejectPropose(proposeId: String, response: String) {
        const propose = await Propose.findById(proposeId);

        if (!propose) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Propose not found');
        }

        if (propose.status !== 'PENDING') {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Propose has already been approved');
        }

        propose.status = 'REJECTED';
        propose.response = response;
        return await propose.save();
    }
}