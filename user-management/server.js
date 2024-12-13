const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./src/graphql/schema");
const resolvers = require("./src/graphql/resolvers");
const authMiddleware = require("./src/middleware/middleware");
const { startConsumer } = require("./src/kafka/consumer");
const app = express();
//app.use(authMiddleware);

const processEvent = (event) => {
	console.log("Processing event:", event);
	// Add logic here to process user sign-in events or other events
};

(async () => {
	await startConsumer("auth-events", processEvent); // Listen to the "auth-events" topic
})();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		// Assuming the userId comes from an Authorization header or session
		const userId = req.headers["user-id"]; // Example: Get userId from headers (or from JWT)
		return { userId };
	},
});

(async () => {
	await server.start();
	server.applyMiddleware({ app });

	app.listen({ port: 4001 }, () => {
		console.log(
			`🚀 Server ready at http://localhost:4001${server.graphqlPath}`
		);
	});
})();
