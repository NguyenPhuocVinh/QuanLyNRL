import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/api-error.util';
import { ProposeService } from '../services/propose.service';
import { CreateProposeRequest } from '../types/request.type';
import { multipleUpload } from '../utils/upload.util';
import fs from 'fs';
``
export class ProposeController {
    static async createPropose(req: Request, res: Response) {
        multipleUpload(req, res, async (err: any) => {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
            }
            try {
                const MSSV = req.user?.MSSV;
                const createProposeRequest: CreateProposeRequest = req.body;
                

                if (!createProposeRequest) {
                    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid request');
                }

                const imagePaths = req.files?.map((file: any) => file.path);

                if (!imagePaths || imagePaths.length === 0) {
                    throw new ApiError(StatusCodes.BAD_REQUEST, 'No files uploaded');
                }

                const propose = await ProposeService.createPropose(MSSV, createProposeRequest, imagePaths);

                // Clean up uploaded files
                imagePaths.forEach((path: string) => fs.unlinkSync(path));

                res.status(StatusCodes.CREATED).json({propose});
            } catch (error: any) {
                res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
            }
        });
    }

    static async approvePropose(req: Request, res: Response) {
        try {
            const proposeId = req.params.proposeId;
            const response = req.body.response;
            const propose = await ProposeService.approvePropose(proposeId, response);
            res.status(StatusCodes.OK).json({propose});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    static async getAllPropose(req: Request, res: Response){
        try {
            const proposes = await ProposeService.getAllPropose()
            res.status(StatusCodes.OK).json({proposes})
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message})
        }
    } 

    static async getProposeByMSSV(req: Request, res: Response) {
        try {
            const MSSV = req.user.MSSV;
            const result = await ProposeService.getProposeByMSSV(MSSV); // Get the array of results
            res.status(StatusCodes.OK).json({ result }); // Return the entire result
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    static async rejectPropose(req: Request, res: Response){
        try {
            const proposeId = req.params.proposeId;
            const response = req.body.response;
            const propose = await ProposeService.rejectPropose(proposeId, response);
            res.status(StatusCodes.OK).json({propose});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }
}
