import mongoose from 'mongoose';
import { programModel } from '../types/program.type';

interface programDocument extends programModel, mongoose.Document {}
export const Program = mongoose.model<programDocument>('Program', new mongoose.Schema({
    programName: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: String, required: true },
    dateStart: { type: Date, required: true },
    point: { type: Number, required: true },
    status: { type: String, required: true, default: 'PENDING',enum: ['PENDING', 'APPROVED', 'FINISHED', 'NOT_APPROVED']},
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true}));