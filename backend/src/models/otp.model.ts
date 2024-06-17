import mongoose from 'mongoose';
import { otpModel } from '../types/otp.type';

interface otpDocument extends otpModel, mongoose.Document {}

export const OTP = mongoose.model<otpDocument>('OTP', new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    otp: { type: String, required: true },
    expiredAt: { type: Date, required: true },
}, { timestamps: true }));

