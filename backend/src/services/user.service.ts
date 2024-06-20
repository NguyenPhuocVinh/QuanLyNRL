import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { userModel } from '../types/user.type';
import { ApiError } from '../utils/api-error.util';
import { OTPService } from './otp.service';
import { generateOTP } from '../utils/otp.util';
import { EmailService } from './email.service';
import { ChangePasswordRequest } from '../types/request.type';
import { generateToken } from '../utils/token.util';
import { getInfoData } from '../utils/filter.util';




export class UserService {
    static async getAllUser() {
        return User.find();
    }

    static async getUserById(id: string) {
        return User.findById(id);
    }

    static async getMSSVByUserId(userId: String) {
        const user = await User.findById(userId) as userModel;
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
        }
        return user.MSSV;
    }

    static async forgotPassword( MSSV: String ) {
        const user = await User.findOne({ MSSV });
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
        }
        const { otp, expiredAt } = generateOTP();
        const email = user.MSSV + '@vaa.edu.vn';

        Promise.all([
            OTPService.createOTP({ userId: user._id, otp, expiredAt }),
            EmailService.sendOTPEmail(email, otp)
        ])

        return { email}
    }

    static async loginByOTP( MSSV: String, otp: String ) {
        const user = await User.findOne({ MSSV });
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
        }
        const otpData = await OTPService.getOTPByUserId(user._id);
        if (!otpData) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'OTP not found');
        }
        if (otpData.otp !== otp) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Wrong OTP');
        }
        if (otpData.expiredAt < new Date()) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'OTP expired');
        }
        await OTPService.deleteOTPByUserId(user._id);
        const { accessToken, refreshToken } = generateToken({ _id: user._id });
        const infoData = getInfoData({
            filed: ['_id', 'MSSV', 'fullName', 'point', 'createdAt'],
            object: user
        });
        return { infoData, accessToken, refreshToken };
    }

    static async changePassword( userId: String, changePasswordRequest: ChangePasswordRequest ){
        const { oldPassword, newPassword  } = changePasswordRequest;
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Old password is incorrect');
        }
        user.password = await bcrypt.hash(newPassword, 10);
        return user.save();
    }

    static async updatePointByMSSV( MSSV: String, point: Number ) {
        const user = await User.findOneAndUpdate({ MSSV }, { point }, { new: true });
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
        }
        const infoData = getInfoData({
            filed: ['_id', 'MSSV', 'fullName', 'point', 'createdAt'],
            object: user
        });
        return infoData;
    }
}