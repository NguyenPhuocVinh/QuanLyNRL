import { StatusCodes } from 'http-status-codes';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { ApiError } from '../utils/api-error.util';
import { User } from '../models/user.model';
import { Admin } from '../models/admin.model';
import { RegisterRequest, LoginRequest, RegisterAdminRequest, LoginAdminRequest } from '../types/request.type';
import { getInfoData } from '../utils/filter.util';
import { generateToken } from '../utils/token.util';


export class AuthService {
    static async register(registerRequest: RegisterRequest) {
        const { MSSV, fullName, password, birthDay, gender, facultyId } = registerRequest;
        const user = await User.findOne({ MSSV });
        if (user) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'User already exists');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ MSSV, fullName, password: hashPassword, birthDay, gender, facultyId });
        const infoData = getInfoData({
                filed: ['_id', 'MSSV', 'fullName', 'point', 'createdAt'],
                object: newUser
        });
        return infoData;
    }

    static async login(loginRequest: LoginRequest) {
        const { MSSV, password } = loginRequest;
        const user = await User.findOne({ MSSV });
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Wrong MSSV');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Wrong password');
        }
        const { accessToken, refreshToken } = generateToken({_id: user._id, MSSV: user.MSSV});
        const infoData = getInfoData({
            filed: ['_id', 'MSSV', 'fullName', 'point', 'createdAt'],
            object: user
        });
        return { infoData, accessToken, refreshToken };
    }
}