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
    isPropose: Boolean
    // createdAt: Date,
}

export type ProgramStatus = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED'
}