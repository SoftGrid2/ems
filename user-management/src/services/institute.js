const db = require("../config/db");
const { generateId } = require("../utils/helper");

const createInstitute = async (name, address, contactNumber) => {
	const id = generateId("INTS");
	const result = await db.query(
		"INSERT INTO institutes (id, name, address, contact_number) VALUES ($1, $2, $3, $4) RETURNING *",
		[id, name, address, contactNumber]
	);
	return result.rows[0];
};

module.exports = { createInstitute };
