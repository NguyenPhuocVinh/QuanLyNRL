import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import { ApiError } from '../utils/api-error.util';
import { Admin } from '../models/admin.model';
import { RegisterAdminRequest, LoginAdminRequest, UpdateUserRequest, UpdateRequest } from '../types/request.type';
import { getInfoData } from '../utils/filter.util';
import { generateToken } from '../utils/token.util';
import { User } from '../models/user.model';


export class SystemService {
    static async registerAdmin(registerAdminRequest: RegisterAdminRequest) {
        const { email, password, role, departmentId } = registerAdminRequest;
        const admin = await Admin.findOne({ email });
        if (admin) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Admin already exists');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create({ email, password: hashPassword, role, departmentId });
        const infoData = getInfoData({
            filed: ['_id', 'email', 'role', 'nameDepartment', 'createdAt'],
            object: newAdmin
        });
        return infoData;
    }

    static async loginAdmin(loginAdminRequest: LoginAdminRequest) {
        const { email, password } = loginAdminRequest;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Wrong email');
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Wrong password');
        }
        const { accessToken, refreshToken } = generateToken({_id: admin._id, role: admin.role});
        const infoData = getInfoData({
            filed: ['_id', 'email', 'role', 'nameDepartment', 'createdAt'],
            object: admin
        });
        return { infoData, accessToken, refreshToken };
    }

    static async updateUser( userId: any, updateUserRequest: UpdateRequest<UpdateUserRequest>) {
        const { MSSV, fullName, password, point } = updateUserRequest;
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
        }
        if(updateUserRequest.password) {
            updateUserRequest.password = await bcrypt.hash(updateUserRequest.password, 10);
        }
        Object.keys(updateUserRequest).forEach(key => {
            const prop = key as keyof UpdateUserRequest;
            if (updateUserRequest[prop] !== undefined) {
                // @ts-ignore
                user[prop] = updateUserRequest[prop];
            }
        });
        const updatedUser = await user.save();
        return updatedUser;
    }

    static async deleteUser(userId: any) {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
        }
        return user;
    }

    static async getAllUser() {
        const users = await User.find();
        const infoData = users.map((user) => getInfoData({
            filed: ['_id', 'MSSV', 'fullName', 'email', 'point', 'birthDay', 'gender', 'facultyId', 'createdAt'],
            object: user.toObject() 
        }));

        return infoData;
    }

}
