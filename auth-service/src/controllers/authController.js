const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const { sendOTP, verifyOTP } = require("../utils/otp");
const { registerGoogleUser } = require("../services/auth.service");

// Sign Up
const signUp = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser)
			return res.status(400).json({ message: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
			role,
		});

		const token = jwt.generateToken(newUser);

		res.status(201).json({ user: newUser, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Login
const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ where: { email } });
		if (!user) return res.status(400).json({ message: "User not found" });

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid)
			return res.status(400).json({ message: "Invalid password" });

		const token = jwt.generateToken(user);

		res.status(200).json({ user, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// OTP Login
const otpLogin = async (req, res) => {
	const { mobileNumber } = req.body;

	try {
		const otp = await sendOTP(mobileNumber);
		res.status(200).json({ message: "OTP sent successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Google Login
const googleLogin = async (req, res) => {
	const { googleToken } = req.body;

	try {
		const user = await registerGoogleUser(googleToken);
		const token = jwt.generateToken(user);

		res.status(200).json({ user, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { signUp, login, otpLogin, googleLogin };
