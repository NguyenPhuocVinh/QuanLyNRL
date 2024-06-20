import { Propose } from '../models/propose.model';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/api-error.util';
import { CreateProposeRequest } from '../types/request.type';
import cloudinary from '../config/cloudinary.config';

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
}