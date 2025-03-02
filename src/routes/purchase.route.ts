import AuthMiddleware from "../middlewares/auth.middleware";
import purchaseController from "../controllers/purchase.controller";
import { Router } from "express";

const router: import("express").Router = Router();
router.post("/", AuthMiddleware.authenticate as any, purchaseController.makePurchase as any);

export default router;
