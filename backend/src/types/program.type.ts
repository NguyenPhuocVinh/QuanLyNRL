import { ObjectId } from 'mongoose';
export interface programModel {
    programName: string,
    description: string,
    quantity: string,
    dateStart: Date,
    point: number,
    status: string,
    categoryId: ObjectId,
    createdAt: Date,
}
