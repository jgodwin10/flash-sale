import mongoose from "mongoose";
import { MONGO_URI } from "./env";

class Database {
	public static async connect(): Promise<void> {
		try {
			await mongoose.connect(MONGO_URI!, {
				retryWrites: true,
				w: "majority",
				appName: "Cluster0",
			});
			console.log("MongoDB Connected");
		} catch (error) {
			console.error("MongoDB Connection Failed", error);
			process.exit(1);
		}
	}
}

export default Database;
