import { createTransporter } from '../config/email.config';
import { ApiError } from '../utils/api-error.util';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
dotenv.config();

export class EmailService {
    static async sendOTPEmail( email: string, otp: string ) {
        try {
            const transporter = await createTransporter();
            const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP for reset password',
            text: `Your OTP is ${otp}`
        };
        await transporter.sendMail(mailOptions);
        } catch (error: any) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
        
    }
}