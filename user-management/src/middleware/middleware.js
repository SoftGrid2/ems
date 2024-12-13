const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	const { role } = req.headers;
	if (!token) {
		throw new Error("Authentication token is missing.");
	}
	if (!role || role !== "admin") {
		return res
			.status(403)
			.json({ message: "Access denied. Admin role required." });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded; // { userId, role }
		next();
	} catch (err) {
		throw new Error("Invalid or expired token.");
	}
};

module.exports = authMiddleware;
