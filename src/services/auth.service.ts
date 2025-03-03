import jwt from "jsonwebtoken";
import { UserModel } from "../models";
import { JWT_SECRET } from "../config/env";

class AuthClass {
	public async signup(name: string, email: string, password: string) {
		const existingUser = await UserModel.findOne({ email });
		if (existingUser) return { success: false, message: "Email already exists" };

		const user = await UserModel.create({ name, email, password });

		const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
			expiresIn: "7d",
		});

		return { success: true, message: "User registered successfully", data: { user, accessToken: token } };
	}

	public async login(email: string, password: string) {
		const user = await UserModel.findOne({ email });
		if (!user || !(await user.comparePassword(password))) {
			return { success: false, message: "Invalid email or password" };
		}

		const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
			expiresIn: "7d",
		});

		return { success: true, message: "Login successful", token };
	}
}

export const AuthService = new AuthClass();

export default AuthService;
