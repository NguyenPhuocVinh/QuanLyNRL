import mongoose from 'mongoose';
import { joinProgramModel } from '../types/join-program.type';

interface joinProgramModelDocument extends joinProgramModel, mongoose.Document {};

export const JoinProgram = mongoose.model<joinProgramModelDocument>('JoinProgram', new mongoose.Schema({
    programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
    MSSV: { type: String, required: true},
    status: { type: String, required: true, enum: ['REGISTERED', 'FINISHED', 'ATTENDED', 'ABSENT' ]},
    registrationDate: { type: Date, required: true },
    joiningDate: { type: Date },
}, { timestamps: true })
)