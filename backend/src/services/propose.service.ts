import { Propose } from '../models/propose.model';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/api-error.util';
import { CreateProposeRequest } from '../types/request.type';
import cloudinary from '../config/cloudinary.config';

export class ProposeService {
    static async createPropose(MSSV: String, createProposeRequest: CreateProposeRequest, imagePath: any) {
        const uploadedImage = await cloudinary.uploader.upload(imagePath, {
            folder: "NRL/Proposes",
        });
        if (!uploadedImage || !uploadedImage.url) {
            throw new Error("Failed to upload image to Cloudinary");
        }
        const newPropose = Propose.create({
            ...createProposeRequest,
            MSSV: MSSV,
            image: uploadedImage.url
        });
        return newPropose;
    }
}