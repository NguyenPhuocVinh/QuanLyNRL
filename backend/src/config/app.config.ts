import dotenv from 'dotenv';
dotenv.config();

export const mongooseConfig = {
    uri: process.env.MONGO_URI,
}

export const appConfig = {
    port: process.env.PORT || 4000,
    secretKey: process.env.JWT_SECRET_KEY
}