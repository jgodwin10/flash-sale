import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export interface AuthenticatedRequest extends Request {
	user?: any;
}

class AuthMiddleware {
	public static authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
		const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];

		if (!token) return res.status(401).json({ message: "Unauthorized" });

		try {
			const decoded = jwt.verify(token, JWT_SECRET);
			req.user = decoded;
			next();
		} catch (error) {
			console.log(error);
			return res.status(401).json({ message: "Invalid token" });
		}
	}
}

export default AuthMiddleware;
