import { ObjectId } from 'mongoose';
export interface otpModel {
    userId: ObjectId;
    otp: string;
    expiredAt: Date;
}
