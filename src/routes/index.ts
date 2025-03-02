import { Router } from "express";
import authRoute from "./auth.route";
import productRoute from "./product.route";
import purchaseRoute from "./purchase.route";
import leaderBoardRoute from "./leaderboard.route";

const router: import("express").Router = Router();

router.use("/auth", authRoute).use("/product", productRoute).use("/purchase", purchaseRoute).use("/leaderboard", leaderBoardRoute);

export default router;
