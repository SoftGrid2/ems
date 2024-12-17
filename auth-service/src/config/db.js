require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
	max: 20,
	idleTimeoutMillis: 30000, // close idle clients after 30 seconds
	connectionTimeoutMillis: 2000, // return an error after 2 seconds if connection can't be established
});

pool
	.connect()
	.then(() => console.log("Connected to the database"))
	.catch((err) => console.error("Connection error", err.stack));

module.exports = pool;
