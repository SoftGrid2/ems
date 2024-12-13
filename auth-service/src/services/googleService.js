const { OAuth2Client } = require("google-auth-library");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret";

const googleClient = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

const googleSignIn = async (_, { token }) => {
	const ticket = await googleClient.verifyIdToken({
		idToken: token,
		audience: "YOUR_GOOGLE_CLIENT_ID",
	});
	const { email, name } = ticket.getPayload();

	let user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

	if (user.rows.length === 0) {
		return { message: "New user detected. Please provide a role." };
	}

	user = user.rows[0];
	const jwtToken = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
		expiresIn: "1h",
	});
	return { token: jwtToken, user };
};

module.exports = { googleSignIn };
