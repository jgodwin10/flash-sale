import { Router } from "express";
import authController from "../controllers/auth.controller";

const router: import("express").Router = Router();

router
      .post("/signup", authController.signup as any)
      .post("/login", authController.login as any);

export default router;
