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

    static async approvePropose(proposeId: String) {
        const propose = await Propose.findById(proposeId);

        if (!propose) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Propose not found');
        }

        if (propose.status !== 'PENDING') {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Propose has already been processed');
        }

        if (propose.type === 'PROPOSE') {
            const program = await ProgramService.getProgramById(propose.programId);
            if (!program) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Program not found');
            }
            if (program.status === 'APPROVED') {
                if (program.isPropose) {
                    propose.status = 'APPROVED';
                    // await propose.save();
                    // return await UserService.updatePointByMSSV(propose.MSSV, program.point);
                    Promise.all([
                        propose.save(),
                        UserService.updatePointByMSSV(propose.MSSV, program.point)
                    ]);
                } else {
                    const joinProgram = await JoinProgramService.checkRegistered(propose.MSSV, propose.programId);
                    if (!joinProgram) {
                        throw new ApiError(StatusCodes.BAD_REQUEST, 'You have not registered for this program');
                    }
                    propose.status = 'APPROVED';
                    // await JoinProgramService.updateStatusJoinProgram(propose.programId);
                    // await propose.save();
                    // const user = await UserService.updatePointByMSSV(propose.MSSV, program.point);
                    // return user;
                    Promise.all([
                        propose.save(),
                        JoinProgramService.updateStatusJoinProgram(propose.programId),
                        UserService.updatePointByMSSV(propose.MSSV, program.point)
                    ]);
                }
            }

        }
    }

    //1. tim propose
    //2. kiem tra propose co status la pending khong
    //3. kiem tra propose co type la propose khong

    //4. kiem tra program co status la approved khong
    //5. kiem tra program co isPropose la true khong
    //6. kiem tra diem cua program
    // truong hop 1
    //1. update status cua propose
    //2. tinh diem cho user
    // truong hop 2
    //1. kiem tra join program co ton tai khong
    //2. kiem tra join program co status la registered khong
    //7. update status cua propose
    //8. update status cua join program
    //9. tinh diem cho user
}