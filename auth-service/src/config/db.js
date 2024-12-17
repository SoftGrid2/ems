require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
	connectionString:
		process.env.DATABASE_URL ||
		`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
	ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, // SSL for Render
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

pool
	.connect()
	.then(() => console.log("Connected to the database"))
	.catch((err) => console.error("Connection error", err.stack));

module.exports = pool;
