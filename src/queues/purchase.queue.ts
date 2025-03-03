import Queue from "bull";
import { PurchaseService } from "../services";
import { REDIS_HOST, REDIS_PORT } from "../config/env";

class PurchaseQueue {
	private static queue = new Queue("purchaseQueue", {
		redis: {
			host: REDIS_HOST,
			port: REDIS_PORT,
		},
	});

	public static async addToQueue(userId: string, productId: string, quantity: number): Promise<any> {
		return new Promise((resolve, reject) => {
			this.queue
				.add({ userId, productId, quantity })
				.then((job) => {
					job
						.finished()
						.then((result) => resolve(result)) //Return final result when job is done
						.catch((error) => reject(error));
				})
				.catch((error) => reject(error));
		});
	}

	/** Process queue jobs */
	public static processQueue() {
		this.queue.process(async (job) => {
			const { userId, productId, quantity } = job.data;
			console.log(`Processing purchase: User ${userId} buying ${quantity} units of ${productId}`);

			// Process purchase and return result
			return await PurchaseService.processPurchase(userId, productId, quantity);
		});

		console.log("Purchase Queue is processing jobs...");
	}
}

// Start queue processing when server starts
PurchaseQueue.processQueue();

export default PurchaseQueue;
