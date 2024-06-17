import { ObjectId } from 'mongoose';

declare module 'express' {
    interface Request {
        user?: any;
    }
}


export type RegisterRequest = {
    MSSV: string;
    fullName: string;
    password: string;
};

export type LoginRequest = {
    MSSV: string;
    password: string;
};


export type RegisterAdminRequest = {
    email: string;
    password: string;
    role?: string;
    departmentId: ObjectId;
}

export type LoginAdminRequest = {
    email: string;
    password: string;
}

export type UpdateUserRequest = {
    MSSV?: string;
    fullName?: string;
    password?: string;
    point?: number;
}

export type UpdateRequest<T> = {
    [K in keyof T]?: T[K];
};

export type CreateProgramRequest = {
    programName: string;
    description: string;
    quantity: string;
    dateStart: Date;
    point: number;
    status: string;
    categoryId: string;
}

export type UpdateProgramRequest = {
    programName?: string;
    description?: string;
    quantity?: string;
    dateStart?: Date;
    point?: number;
    categoryId?: string;
}

export type CreateOTPRequest = {
    userId: any;
    otp: string;
    expiredAt: Date;
}

export type ChangePasswordRequest = {
    oldPassword: string;
    newPassword: string;
}