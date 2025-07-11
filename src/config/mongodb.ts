import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.configDotenv()

let isConnected = false;

export async function connectDB(): Promise<void> {
    if (isConnected) {
        console.log('[mongo] Using existing connection');
        return;
    }

    const uri = process.env.DATABASE_URI;

    if (!uri) {
        throw new Error('MongoDB URI is not defined in environment variables');
    }

    try {
        await mongoose.connect(uri);
        isConnected = true;
        console.log('[mongo] ✅ Connected to MongoDB');
    } catch (error) {
        console.error('[mongo] ❌ Connection failed:', error);
        throw error;
    }
}

export default connectDB;