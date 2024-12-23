const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.userId;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid or expired token" });
	}
};

module.exports = authMiddleware;
