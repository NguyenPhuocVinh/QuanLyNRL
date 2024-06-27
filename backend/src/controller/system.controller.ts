import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { ApiError } from '../utils/api-error.util';
import { UserService } from '../services/user.service';
import { SystemService } from '../services/system.service';
import { RegisterAdminRequest, LoginAdminRequest, UpdateUserRequest } from '../types/request.type';


export class SystemController {

    static async registerAdmin( req: Request, res: Response ) {
        try {
            const registerAdminRequest: RegisterAdminRequest = req.body;
            if (!registerAdminRequest.email || !registerAdminRequest.password ) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing required fields');
            }
            const admin = await SystemService.registerAdmin(registerAdminRequest);
            res.status(StatusCodes.CREATED).json({admin});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }

    static async loginAdmin( req: Request, res: Response ) {
        try {
            const loginAdminRequest: LoginAdminRequest = req.body;
            if (!loginAdminRequest.email || !loginAdminRequest.password) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing required fields');
            }
            const { infoData, accessToken, refreshToken } = await SystemService.loginAdmin(loginAdminRequest);
            res.status(StatusCodes.OK).json({ user: infoData, accessToken, refreshToken });
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }

    static async getAllUser(req: Request, res: Response) {
        try {
            const users = await SystemService.getAllUser();
            res.status(StatusCodes.OK).json({users});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const userId = req.query.userId;
            if (!userId) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing required userId');
            }
            const updateUserRequest: UpdateUserRequest = req.body;
            const user = await SystemService.updateUser(userId, updateUserRequest);
            res.status(StatusCodes.OK).json({user});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const userId = req.query.userId;
            if (!userId) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing required userId');
            }
            const user = await SystemService.deleteUser(userId);
            res.status(StatusCodes.OK).json({ user: user , message: 'Delete user success' });
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }

    static async getUserById(req: Request, res: Response) {
        try {
            const userId = req.query.userId as string;
            if (!userId) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing required userId');
            }
            const user = await UserService.getUserById(userId);
            res.status(StatusCodes.OK).json({user});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }

}