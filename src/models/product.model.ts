import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
	{
		name: { type: String, required: true },
		stock: { type: Number, required: true, default: 200, index: true },
		saleStartTime: { type: Date, required: true },
		saleEndTime: { type: Date },
	},
	{ timestamps: true }
);

export default model("Product", ProductSchema);
