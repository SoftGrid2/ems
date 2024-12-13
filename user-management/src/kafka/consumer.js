require("dotenv").config();

const { Kafka } = require("kafkajs");
const kafkaBroker =
	process.env.KAFKA_BROKER ||
	(process.env.NODE_ENV === "production" ? "kafka:9092" : "localhost:9092");
const kafka = new Kafka({
	clientId: "user-management",
	brokers: [kafkaBroker],
	connectionTimeout: 30000,
});

const consumer = kafka.consumer({ groupId: "user-management-group" });

(async () => {
	try {
		await consumer.connect();
		console.log("Consumer connected");
	} catch (error) {
		console.error("Error connecting consumer:", error);
	}
})();

const startConsumer = async (topic, callback) => {
	try {
		await consumer.subscribe({ topic, fromBeginning: true }); // Default: only new messages

		await consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				try {
					const event = JSON.parse(message.value.toString());
					console.log(`Received message on topic ${topic}:`, event);
					if (callback) callback(event);
				} catch (error) {
					console.error("Error processing message:", error);
				}
			},
		});
	} catch (error) {
		console.error("Error starting consumer:", error);
	}
};

module.exports = { startConsumer };
