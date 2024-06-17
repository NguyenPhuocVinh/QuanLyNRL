import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils/api-error.util';

export const handleError = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const { statusCode = StatusCodes.INTERNAL_SERVER_ERROR, message } = err;
    res.status(statusCode).json({
        statusCode,
        message
    });
};