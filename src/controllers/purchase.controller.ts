import { Response } from "express";
import PurchaseQueue from "../queues/purchase.queue";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

class PurchaseClass {
	public async makePurchase(req: AuthenticatedRequest, res: Response) {
		const { id: userId } = req.user;
		const { productId, quantity } = req.body;

		try {
			// Add job to queue and wait for result
			const result = await PurchaseQueue.addToQueue(userId, productId, quantity);

			// Send final response from the queue
			res.status(result.success ? 200 : 400).json({ message: result.message, data: result.data });
		} catch (error) {
			res.status(500).json({ message: "Error processing purchase", error });
		}
	}
}

export const PurchaseController = new PurchaseClass();
export default PurchaseController;
