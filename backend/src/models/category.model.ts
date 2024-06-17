import mongoose from 'mongoose';
import { CategoryModel } from '../types/category.type';

interface CategoryDocument extends mongoose.Document, CategoryModel {}

export const Category = mongoose.model<CategoryDocument>('Category', new mongoose.Schema({
    categoryName: { type: String, required: true, enum: ['ONLINE', 'OFFLINE'] }
}, { timestamps: true}));