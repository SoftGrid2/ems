const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type User {
		id: ID!
		email: String
		name: String
		phone_number: String
		role: String
		createdAt: String
		updatedAt: String
	}

	type AuthPayload {
		token: String
		user: User
	}

	type Query {
		getUser(email: String!): User
	}

	type Mutation {
		signup(
			email: String!
			password: String!
			role: String!
			name: String
			phone_number: String
		): AuthPayload
		login(email: String!, password: String!): AuthPayload
		googleSignIn(token: String!): AuthPayload
		requestOtp(mobileNumber: String!): String
		verifyOtp(mobileNumber: String!, otpCode: String!): AuthPayload
	}
`;

module.exports = typeDefs;
