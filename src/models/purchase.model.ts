import { Schema, model } from "mongoose";

const PurchaseSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
		quantity: { type: Number, required: true },
		purchaseTime: { type: Date, default: Date.now, index: true },
	},
	{ timestamps: true }
);

export const purchaseModel = model("Purchase", PurchaseSchema);

export default purchaseModel;
