import mongoose from 'mongoose';
import { facultyModel } from '../types/faculty.type';

interface facultyDocument extends facultyModel, mongoose.Document {}

export const Faculty = mongoose.model<facultyDocument>('Faculty', new mongoose.Schema({
    facultyName: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true}));