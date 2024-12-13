const { createInstitute } = require("../services/institute");
const { addTeacher } = require("../services/teacher");
const { addStudent } = require("../services/student");
const { addClass } = require("../services/class");
const { authorizedUsers } = require("../kafka/consumer");

const resolvers = {
	Query: {
		// Example query
		hello: () => "Hello, World!",

		// Protecting the "users" query with Kafka authorization
		users: (_, __, context) => {
			const userId = context.userId; // Assuming the userId is passed from API Gateway or context

			if (!authorizedUsers.get(userId)) {
				throw new Error("Access denied. User is not authorized.");
			}

			// Return user details if authorized
			return `User ${userId} is authorized`;
		},
	},

	Mutation: {
		// Mutation to create an institute
		createInstitute: (_, { name, address, contactNumber }) =>
			createInstitute(name, address, contactNumber),

		// Mutation to add a teacher
		addTeacher: (_, { instituteId, name, surname, mobile, subject }) =>
			addTeacher(instituteId, name, surname, mobile, subject),

		// Mutation to add a student
		addStudent: (_, { teacherId, classId, name, surname, subjectGroup }) =>
			addStudent(teacherId, classId, name, surname, subjectGroup),

		// Mutation to add a class
		addClass: (_, { instituteId, className }) =>
			addClass(instituteId, className),

		// Protecting the signIn mutation with Kafka authorization
		signIn: (_, { username, password }) => {
			// This mutation could authenticate the user and trigger the Kafka producer (from auth-service)
			return `User ${username} signed in`;
		},
	},
};

module.exports = resolvers; // Ensure there is no extra semicolon here
