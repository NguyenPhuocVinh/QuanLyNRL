import mongoose from 'mongoose';
import { userModel } from '../types/user.type';

interface userDocument extends userModel, mongoose.Document {}

export const User = mongoose.model<userDocument>('User', new mongoose.Schema({
    MSSV: { type: String, required: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    point: { type: Number, default: 0},
    birthDay: { type: Date },
    gender: { type: String },
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }
}, { timestamps: true}));
