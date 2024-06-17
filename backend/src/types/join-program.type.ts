import { ObjectId } from 'mongoose';
export interface joinProgramModel {
    programId: ObjectId;
    MSSV: string;
    status: string;
    registrationDate: Date;
    joiningDate: Date;
    createdAt: Date;
}