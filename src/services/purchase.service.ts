import mongoose from "mongoose";
import redisClient from "../config/redis";
import productModel from "../models/product.model";
import purchaseModel from "../models/purchase.model";

class PurchaseService {
	private readonly MAX_QUANTITY_PER_USER = 5;

	public async processPurchase(userId: string, productId: string, quantity: number) {
		if (quantity > this.MAX_QUANTITY_PER_USER) {
			return { success: false, message: `Cannot buy more than ${this.MAX_QUANTITY_PER_USER} units.` };
		}

		const lockKey = `lock:purchase:${productId}`;

		// Check if stock is being processed (to prevent duplicate processing)
		const isLocked = await redisClient.get(lockKey);
		if (isLocked) {
			return { success: false, message: "Stock is being processed, please try again" };
		}

		// Lock stock processing for 2 seconds to avoid race conditions
		await redisClient.set(lockKey, "locked", 3);

		//  Start MongoDB Transaction
		const session = await mongoose.startSession();
		session.startTransaction();

		try {
			const product = await productModel.findById(productId).session(session);
			if (!product || product.stock < quantity) {
				throw new Error("Stock unavailable");
			}

			// Validate sale start and end time
			const now = new Date();
			if (now < new Date(product.saleStartTime)) throw new Error("Sale has not started yet");
			if (product.saleEndTime && now > new Date(product.saleEndTime)) throw new Error("Sale has ended");

			// Decrement stock in MongoDB (Redis already reduced it)
			product.stock -= quantity;
			await product.save({ session });

			//  Record purchase
			const productData = await purchaseModel.create([{ userId, productId, quantity }], { session });

			// Commit transaction
			await session.commitTransaction();
			session.endSession();

			// Release Redis lock
			await redisClient.del(lockKey);

			return { success: true, message: "Purchase successful", data: productData };
		} catch (error) {
			await session.abortTransaction();
			session.endSession();

			// Rollback Redis stock update if MongoDB fails
			await redisClient.del(lockKey);

			console.error("Transaction failed:", error);
			return { success: false, message: "Transaction failed" };
		}
	}
}

export default new PurchaseService();
