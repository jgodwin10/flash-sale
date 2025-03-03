import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
	name: string;
	email: string;
	password: string;
	comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

// Compare passwords
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
	return bcrypt.compare(password, this.password);
};

export const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
