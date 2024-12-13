const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
//const { generateOTP, validateOTP } = require("../../utils/otp");
require("dotenv").config();

module.exports = {
	Query: {
		async login(_, { email, password }) {
			const user = await User.findOne({ where: { email } });
			if (!user || !(await bcrypt.compare(password, user.password))) {
				throw new Error("Invalid credentials");
			}

			const token = jwt.sign(
				{ id: user.id, role: user.role },
				process.env.JWT_SECRET,
				{ expiresIn: "1d" }
			);

			return { ...user.toJSON(), token };
		},
		async verifyToken(_, { token }) {
			try {
				jwt.verify(token, process.env.JWT_SECRET);
				return true;
			} catch {
				return false;
			}
		},
	},

	Mutation: {
		async signUp(_, { email, password, name, role }) {
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await User.create({
				email,
				password: hashedPassword,
				name,
			});

			const token = jwt.sign(
				{ id: user.id, role: user.role },
				process.env.JWT_SECRET,
				{ expiresIn: "1d" }
			);

			return { ...user.toJSON(), token };
		},
		async generateOTP(_, { mobile }) {
			const otp = generateOTP();
			// Save OTP to the database (optional for persistent storage).
			return otp;
		},
		async loginWithOTP(_, { mobile, otp }) {
			if (!validateOTP(otp)) {
				throw new Error("Invalid OTP");
			}

			const user = await User.findOne({ where: { mobile } });
			if (!user) throw new Error("User not found");

			const token = jwt.sign(
				{ id: user.id, role: user.role },
				process.env.JWT_SECRET,
				{ expiresIn: "1d" }
			);

			return { ...user.toJSON(), token };
		},
	},
};
