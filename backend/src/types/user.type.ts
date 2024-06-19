import { ObjectId } from 'mongoose';
export interface userModel {
    MSSV: string,
    fullName: string,
    password: string,
    point: number,
    birthDay: Date,
    gender: string,
    facultyId: ObjectId,
}

export interface adminModel {
    email: string,
    password: string,
    role: string,
    facultyId: ObjectId,
}