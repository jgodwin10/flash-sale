import { z } from "zod";
import Product from "../models/product.model";

class ProductClass {
	private productSchema = z.object({
		name: z.string().min(3, "Product name must be at least 3 characters long"),
		stock: z.number().min(1, "Stock must be at least 1"),
		saleStartTime: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
		saleEndTime: z.string().optional(),
	});

	/** Create a New Product */
	public async createProduct(data: any) {
		const validatedData = this.productSchema.safeParse(data);
		if (!validatedData.success) {
			return { success: false, message: validatedData.error.errors };
		}

		const { name, stock, saleStartTime, saleEndTime } = validatedData.data;

		const product = await Product.create({
			name,
			stock,
			saleStartTime: new Date(saleStartTime),
			saleEndTime: saleEndTime ? new Date(saleEndTime) : null,
		});

		return { success: true, message: "Product created successfully", product };
	}

	public async getStockById(productId: string) {
		const product = await Product.findById(productId);
		return product ? product : null;
	}

	public async getProduct() {
		return await Product.find()
			.sort({ saleStartTime: -1 }) // Newest sales first
			.lean();
	}

	public async decrementStock(productId: string, quantity: number): Promise<boolean> {
		const product = await Product.findById(productId);
		if (!product || product.stock < quantity) return false;

		product.stock -= quantity;
		await product.save();
		return true;
	}
}

export const ProductService = new ProductClass();

export default ProductService;
