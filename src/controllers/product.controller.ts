import { Request, Response } from "express";
import { ProductService } from "../services";

class ProductClass {
	public async getStockById(req: Request, res: Response) {
		const stock = await ProductService.getStockById(req.params.productId);
		if (stock === null) return res.status(404).json({ message: "Product not found" });
		res.json({ stock });
	}

	public async getAllStock(_req: Request, res: Response) {
		const stock = await ProductService.getProduct();
		if (stock === null) return res.status(404).json({ message: "Product not found" });
		res.json({ stock });
	}

	public async createProduct(req: Request, res: Response) {
		const result = await ProductService.createProduct(req.body);
		if (!result.success) return res.status(400).json({ message: result.message });

		res.status(201).json({ message: result.message, product: result.product });
	}
}

export const ProductController = new ProductClass();

export default ProductController;
