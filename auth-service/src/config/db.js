require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
	host: process.env.DB_HOST || "localhost",
	port: process.env.DB_PORT || 5432,
	user: process.env.DB_USER || "postgres",
	password: process.env.DB_PASSWORD || "viraj179",
	database: process.env.DB_NAME || "auth-service",
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 8000,
});

pool
	.connect()
	.then(() => console.log("Connected to the database"))
	.catch((err) => console.error("Connection error", err.stack));

module.exports = pool;
