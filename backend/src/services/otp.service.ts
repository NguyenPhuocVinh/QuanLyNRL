import { OTP } from '../models/otp.model';
import { ApiError } from '../utils/api-error.util';
import { StatusCodes } from 'http-status-codes';
import { CreateOTPRequest } from '../types/request.type';

export class OTPService {
    static async createOTP (createOTPRequest: CreateOTPRequest) {
        const otpData = await OTP.findOne({ userId: createOTPRequest.userId });
        if (otpData) {
            return OTP.updateOne({ userId: createOTPRequest.userId }, createOTPRequest);
        }
        return OTP.create(createOTPRequest);
    }

    static async getOTPByUserId (userId: any) {
        return OTP.findOne({ userId });
    }

    static async deleteOTPByUserId (userId: any) {
        return OTP.deleteOne({ userId });
    }

    static async updateOTPByUserId (userId: any, newOTP: any) {
        return OTP.updateOne({ userId }, newOTP, { new: true });
    }

}