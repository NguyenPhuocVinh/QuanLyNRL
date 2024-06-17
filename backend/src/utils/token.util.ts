import { appConfig } from '../config/app.config';
import jwt from 'jsonwebtoken';

export function generateToken(payload: any) {
    const accessToken = jwt.sign(
        payload, 
        appConfig.secretKey as string,
        { expiresIn: '1d', algorithm: 'HS256' }
    );
    const refreshToken = jwt.sign(
        payload, 
        appConfig.secretKey as string,
        { expiresIn: '7d', algorithm: 'HS256' }
    );
    return { accessToken, refreshToken };
}

export function verifyToken(token: string) {
    return jwt.verify(token, appConfig.secretKey as string);
}
