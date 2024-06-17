import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const ROLE_LIST = {
    SUPERADMIN: 'SUPERADMIN',
    ADMIN: 'ADMIN',
}


export const checkPermission = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user.role;
        console.log(userRole);
        if (!userRole || !roles.includes(userRole)) {
            return res.status(StatusCodes.FORBIDDEN).json({ error: 'You do not have permission to access this resource' });
        }
        next();
    }
}
