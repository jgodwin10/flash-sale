import { createClient } from "redis";

class RedisClient {
	private static client = createClient({ url: process.env.REDIS_URI });

	public static async connect(): Promise<void> {
		try {
			this.client.on("error", (err) => console.error("Redis Error:", err));
			await this.client.connect();
			console.log("Redis Connected");
		} catch (error) {
			console.error("Redis Connection Failed:", error);
			process.exit(1);
		}
	}

	/**Set a value in Redis */
	public static async set(key: string, value: string, expiryInSeconds?: number): Promise<void> {
		try {
			if (expiryInSeconds) {
				await this.client.setEx(key, expiryInSeconds, value);
			} else {
				await this.client.set(key, value);
			}
		} catch (error) {
			console.error(`Redis SET Error: ${error}`);
		}
	}

	/**Get a value from Redis */
	public static async get(key: string): Promise<string | null> {
		try {
			return await this.client.get(key);
		} catch (error) {
			console.error(`Redis GET Error: ${error}`);
			return null;
		}
	}

	/**Delete a key from Redis */
	public static async del(key: string): Promise<void> {
		try {
			await this.client.del(key);
		} catch (error) {
			console.error(`Redis DEL Error: ${error}`);
		}
	}
}

export default RedisClient;
