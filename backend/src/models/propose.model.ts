import mongoose from 'mongoose';
import { ProposeModel } from '../types/propose.type';

interface proposeDocument extends ProposeModel, mongoose.Document {}
export const Propose = mongoose.model<proposeDocument>('Propose', new mongoose.Schema({
    MSSV: { type: String, required: true },
    adminId: { type: String },
    programId: { type: String, required: true },
    images: { type: [String] },
    content: { type: String, required: true },
    status: { type: String, default: 'PENDING', enum: ['PENDING', 'APPROVED', 'REJECTED'] },
    type: { type: String, required: true, enum: ['PROPOSE', 'COMPLAINT']},
    response: { type: String }
}, { timestamps: true}));