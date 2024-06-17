import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/api-error.util';
import { ChangePasswordRequest } from '../types/request.type';


export class UserController {
    static async forgotPassword (req: Request, res: Response) {
        try {
            const MSSV = req.body.MSSV;
            const result = await UserService.forgotPassword(MSSV);
            res.status(StatusCodes.OK).json({result: result, message: 'OTP code has been sent to your email'});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }

    static async loginByOTP (req: Request, res: Response) {
        try {
            const { MSSV, otp } = req.body;
            const result = await UserService.loginByOTP(MSSV, otp);
            res.status(StatusCodes.OK).json(result);
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }

    static async changePassword (req: Request, res: Response) {
        try {
            const userId = req.user;
            const changePasswordRequest: ChangePasswordRequest = req.body;
            const result = await UserService.changePassword(userId, changePasswordRequest);
            res.status(StatusCodes.OK).json(result);
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }
}