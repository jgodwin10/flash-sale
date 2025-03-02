import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import { JWT_SECRET } from "../config/env";

class AuthService {
	public async signup(name: string, email: string, password: string) {
		const existingUser = await userModel.findOne({ email });
		if (existingUser) return { success: false, message: "Email already exists" };

		const user = await userModel.create({ name, email, password });

		const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
			expiresIn: "7d",
		});

		return { success: true, message: "User registered successfully", data: { user, accessToken: token } };
	}

	public async login(email: string, password: string) {
		const user = await userModel.findOne({ email });
		if (!user || !(await user.comparePassword(password))) {
			return { success: false, message: "Invalid email or password" };
		}

		const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
			expiresIn: "7d",
		});

		return { success: true, message: "Login successful", token };
	}
}

export default new AuthService();
