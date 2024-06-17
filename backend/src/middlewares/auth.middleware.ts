import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/api-error.util';
import { verifyToken } from '../utils/token.util';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'Please authenticate');
        }
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error: any) {
        res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
}