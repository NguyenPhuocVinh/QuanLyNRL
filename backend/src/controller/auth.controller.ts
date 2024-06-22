import { AuthService } from '../services/auth.service';
import { ApiError } from '../utils/api-error.util';
import { LoginRequest, RegisterRequest} from '../types/request.type';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


export class AuthController {
    static async register( req: Request, res: Response ) {
        try {
            const registerRequest: RegisterRequest = req.body;
            console.log(registerRequest);
            if (!registerRequest.MSSV || !registerRequest.fullName || !registerRequest.password) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing required fields');
            }
            const user = await AuthService.register(registerRequest);
            res.status(StatusCodes.CREATED).json({user});
        } catch (error: any) {
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }

    static async login( req: Request, res: Response ) {
        try {
            const loginRequest: LoginRequest = req.body;
            if (!loginRequest.MSSV || !loginRequest.password) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing required fields');
            }
            const { infoData, accessToken, refreshToken } = await AuthService.login(loginRequest);
            res.status(StatusCodes.OK).json({ user: infoData, accessToken, refreshToken });
        } catch (error: any) {
            console.log(error);
            res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }
}