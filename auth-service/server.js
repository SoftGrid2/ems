const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./src/graphql/schema");
const resolvers = require("./src/graphql/resolvers");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const startServer = async () => {
	const app = express();

	app.get("/", (req, res) => {
		res.json("Hello from server");
	});

	const corsOptions = {
		origin: "*",
		credentials: true,
	};
	app.use(cors(corsOptions));

	// Apollo Server setup
	const server = new ApolloServer({
		introspection: true,
		playground: true,
		typeDefs,
		resolvers,
		context: ({ req }) => {
			const token = req.headers.authorization || "";
			const userId = getUserIdFromToken(token);
			return { userId };
		},
	});

	// Start the server
	await server.start();
	server.applyMiddleware({ app });

	const getUserIdFromToken = (token) => {
		return 1;
	};

	app.listen(4000, () => {
		console.log(
			`🚀Auth Service Server ready at http://localhost:4000${server.graphqlPath}`
		);
	});
};

startServer().catch((error) => {
	console.error("Error starting server:", error);
});
