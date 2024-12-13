const db = require("../config/db");
const { generateId } = require("../utils/helper");

const addStudent = async (teacherId, classId, name, surname, subjectGroup) => {
	const id = generateId("STU");
	const result = await db.query(
		"INSERT INTO students (id, teacher_id, class_id, name, surname, subject_group) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
		[id, teacherId, classId, name, surname, subjectGroup]
	);
	return result.rows[0];
};

module.exports = { addStudent };
