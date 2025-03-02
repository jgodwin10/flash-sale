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

	public static getInstance() {
		return this.client;
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

	/**Check if a key exists in Redis */
	public static async exists(key: string): Promise<boolean> {
		try {
			const exists = await this.client.exists(key);
			return exists === 1;
		} catch (error) {
			console.error(`Redis EXISTS Error: ${error}`);
			return false;
		}
	}

	/**Increment a value in Redis (Used for stock rollback) */
	public static async incrBy(key: string, value: number): Promise<number | null> {
		try {
			return await this.client.incrBy(key, value);
		} catch (error) {
			console.error(`Redis INCRBY Error: ${error}`);
			return null;
		}
	}

	/**Decrement a value in Redis (Used for stock reduction) */
	public static async decrBy(key: string, value: number): Promise<number | null> {
		try {
			return await this.client.decrBy(key, value);
		} catch (error) {
			console.error(`❌ Redis DECRBY Error: ${error}`);
			return null;
		}
	}

	/**Gracefully disconnect from Redis */
	public static async disconnect(): Promise<void> {
		try {
			await this.client.quit();
			console.log("✅ Redis Disconnected");
		} catch (error) {
			console.error(`❌ Redis Disconnect Error: ${error}`);
		}
	}
}

export default RedisClient;
