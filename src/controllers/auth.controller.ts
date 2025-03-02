import { Request, Response } from "express";
import authService from "../services/auth.service";
import { NODE_ENV } from "../config/env";

class AuthController {
	public async signup(req: Request, res: Response) {
		const { name, email, password } = req.body;
		const result = await authService.signup(name, email, password);
		if (!result.success) return res.status(400).json({ message: result.message });

		res.cookie("token", result.data?.accessToken, {
			httpOnly: true, 
			maxAge: 7 * 24 * 60 * 60 * 1000
		});

		res.status(201).json({ message: result.message, data: result.data });
	}

	public async login(req: Request, res: Response) {
		const { email, password } = req.body;
		const result = await authService.login(email, password);
		if (!result.success) return res.status(400).json({ message: result.message });

		res.cookie("token", result.token, {
			maxAge: 7 * 24 * 60 * 1000 * 1000,
			httpOnly: true,
		});

		res.status(200).json({ message: result.message, token: result.token });
	}
}

export default new AuthController();
