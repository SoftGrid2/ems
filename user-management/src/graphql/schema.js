const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Institute {
		id: ID!
		name: String!
		address: String!
		contact_number: String!
	}

	type Teacher {
		id: ID!
		institute_id: ID!
		name: String!
		surname: String!
		mobile: String!
		subject: String!
	}

	type Student {
		id: ID!
		teacher_id: ID!
		class_id: ID!
		name: String!
		surname: String!
		subject_group: String!
	}

	type Class {
		id: ID!
		institute_id: ID!
		class_name: String!
	}

	type Query {
		hello: String
		users: [String]
	}

	type Mutation {
		createInstitute(
			name: String!
			address: String!
			contactNumber: String!
		): Institute
		addTeacher(
			instituteId: ID!
			name: String!
			surname: String!
			mobile: String!
			subject: String!
		): Teacher
		addStudent(
			teacherId: ID!
			classId: ID!
			name: String!
			surname: String!
			subjectGroup: String!
		): Student
		addClass(instituteId: ID!, className: String!): Class
		signIn(username: String!, password: String!): String
	}
`;

module.exports = typeDefs;
