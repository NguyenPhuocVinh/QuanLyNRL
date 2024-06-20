import mongoose from 'mongoose';
import { programModel } from '../types/program.type';

interface programDocument extends programModel, mongoose.Document {}
export const Program = mongoose.model<programDocument>('Program', new mongoose.Schema({
    programName: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: String, required: true },
    startDate: { type: Date, required: true },
    registerDate: { type: Date, required: true },
    point: { type: Number, required: true },
    status: { type: String, default: 'PENDING', enum: ['PENDING', 'APPROVED', 'REJECTED']},
    minusPoint: { type: Boolean },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    isPropose: { type: Boolean, default: false },
}, { timestamps: true }));