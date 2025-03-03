import dotenv from "dotenv";

dotenv.config();

export const PORT = Number(process.env.PORT) || 5000;
export const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
export const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://jacobgodwin281:ZrxRlC1yMbNBWm5s@cluster0.683pv.mongodb.net";
export const JWT_SECRET = process.env.JWT_SECRET || "hellosecret";
export const REDIS_URI = process.env.REDIS_URL || "redis://localhost:6379";
export const NODE_ENV = process.env.NODE_ENV;
export const REDIS_HOST = process.env.REDIS_HOST || "localhost";
