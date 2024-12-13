const db = require("../config/db");
const { generateId } = require("../utils/helper");

const addTeacher = async (instituteId, name, surname, mobile, subject) => {
	const id = generateId("TEAC");
	const result = await db.query(
		"INSERT INTO teachers (id, institute_id, name, surname, mobile, subject) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
		[id, instituteId, name, surname, mobile, subject]
	);
	return result.rows[0];
};

module.exports = { addTeacher };
