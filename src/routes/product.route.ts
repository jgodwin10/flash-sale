import { Router } from "express";
import ProductController from "../controllers/product.controller";

const router: import("express").Router = Router();
router
	.get("/product/:productId", ProductController.getStockById as any)
	.get("/all", ProductController.getAllStock as any)
	.post("/", ProductController.createProduct as any);

export default router;
