import mongoose from 'mongoose';
import { mongooseConfig } from '../config/app.config';

export class InitMongoDB {
    static async connect(): Promise<void> {
        try {
            await mongoose.connect(mongooseConfig.uri as string);
            console.log('MongoDB connected');
        } catch (error) {
            console.error(error);
        }
    }
}