import { ObjectId } from 'mongoose';
export interface programModel {
    programName: string,
    image: string,
    description: string,
    quantity: string,
    startDate: Date,
    registerDate: Date,
    point: number,
    status: string,
    minusPoint: Boolean,
    categoryId: ObjectId,
    // createdAt: Date,
}
