export interface userModel {
    MSSV: string,
    fullName: string,
    password: string,
    point: number,
    createdAt: Date,
}

export interface adminModel {
    email: string,
    password: string,
    role: string,
    departmentId: string,
}