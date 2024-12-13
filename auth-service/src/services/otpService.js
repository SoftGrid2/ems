const db = require("../config/db");

const requestOtp = async (_, { mobileNumber }) => {
	const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
	const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

	await db.query(
		"INSERT INTO otps (mobile_number, otp_code, expires_at) VALUES ($1, $2, $3) ON CONFLICT (mobile_number) DO UPDATE SET otp_code = $2, expires_at = $3",
		[mobileNumber, otpCode, expiresAt]
	);

	// Produce Kafka event

	return "OTP sent successfully";
};

const verifyOtp = async (_, { mobileNumber, otpCode }) => {
	const result = await db.query(
		"SELECT * FROM otps WHERE mobile_number = $1 AND otp_code = $2 AND expires_at > NOW()",
		[mobileNumber, otpCode]
	);

	if (result.rows.length === 0) throw new Error("Invalid or expired OTP");

	await db.query("UPDATE otps SET verified = TRUE WHERE mobile_number = $1", [
		mobileNumber,
	]);
	const user = await db.query("SELECT * FROM users WHERE mobile_number = $1", [
		mobileNumber,
	]);

	if (user.rows.length === 0) throw new Error("User not found");

	const token = jwt.sign(
		{ userId: user.rows[0].id, role: user.rows[0].role },
		"your_jwt_secret",
		{
			expiresIn: "1h",
		}
	);
	return { token, user: user.rows[0] };
};

module.exports = { requestOtp, verifyOtp };
