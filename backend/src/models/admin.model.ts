import mongoose from 'mongoose';
import { adminModel } from '../types/user.type';

interface adminDocument extends adminModel, mongoose.Document {}

export const Admin = mongoose.model<adminDocument>('Admin', new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    departmentId: { type: String, required: true }
}, { timestamps: true}));
