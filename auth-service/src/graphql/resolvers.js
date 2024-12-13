const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const {
	googleSignIn,
	requestOtp,
	verifyOtp,
} = require("../services/googleService");
const otpService = require("../services/otpService");
const sendMessage = require("../kafka/producer"); // Kafka producer

const JWT_SECRET = "your_jwt_secret";

const resolvers = {
	Query: {
		getUser: async (_, { email }) => {
			const result = await db.query("SELECT * FROM users WHERE email = $1", [
				email,
			]);
			if (result.rows.length === 0) throw new Error("User not found");
			return result.rows[0];
		},
	},

	Mutation: {
		signup: async (_, { email, password, role, name, phone_number }) => {
			if (!email || !password || !role || !name || !phone_number)
				throw new Error(
					"Email, password, role, name, and phone number are required"
				);

			const hashedPassword = await bcrypt.hash(password, 10);

			const result = await db.query(
				"INSERT INTO users (email, password, role, name, mobile_number) VALUES ($1, $2, $3, $4, $5) RETURNING *",
				[email, hashedPassword, role, name, phone_number]
			);

			const token = jwt.sign(
				{ userId: result.rows[0].id, role: result.rows[0].role },
				JWT_SECRET,
				{
					expiresIn: "1h",
				}
			);
			return { token, user: result.rows[0] };
		},

		login: async (_, { email, password }) => {
			const result = await db.query("SELECT * FROM users WHERE email = $1", [
				email,
			]);
			if (result.rows.length === 0) throw new Error("User not found");

			const user = result.rows[0];
			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) throw new Error("Invalid credentials");

			const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
				expiresIn: "1h",
			});

			// After successful login, send Kafka message
			const message = {
				userId: user.id,
				role: user.role,
				event: "USER_SIGN_IN",
				timestamp: new Date().toISOString(),
			};

			// Send event to Kafka
			await sendMessage("auth-events", message);

			return { token, user };
		},

		googleSignIn: googleSignIn,

		requestOtp: otpService.requestOtp,

		verifyOtp: otpService.verifyOtp,
	},
};

module.exports = resolvers;
