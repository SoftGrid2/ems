const db = require("../config/db");
const { generateId } = require("../utils/helper");

const addClass = async (instituteId, className) => {
	const id = generateId("CLA");
	const result = await db.query(
		"INSERT INTO classes (id, institute_id, class_name) VALUES ($1, $2, $3) RETURNING *",
		[id, instituteId, className]
	);
	return result.rows[0];
};

module.exports = { addClass };
