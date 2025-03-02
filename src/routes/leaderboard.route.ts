import { Router } from "express";
import leaderboardController from "../controllers/leaderboard.controller";

const router: import("express").Router = Router();

router.get("/", leaderboardController.getLeaderboard);

export default router;
