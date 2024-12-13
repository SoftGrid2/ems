require("dotenv").config();

const { Kafka } = require("kafkajs");
const kafkaBroker = process.env.KAFKA_BROKER || "localhost:9092";

const kafka = new Kafka({
	clientId: "auth-service", // Name of your service
	brokers: [kafkaBroker], // Your Kafka broker(s)
});

const producer = kafka.producer();

// Connect producer at startup
(async () => {
	try {
		await producer.connect();
		console.log("Producer connected");
	} catch (error) {
		console.error("Error connecting producer:", error);
	}
})();

// Function to send messages to Kafka
const sendMessage = async (topic, message) => {
	try {
		await producer.send({
			topic,
			messages: [
				{
					value: JSON.stringify(message), // Convert message to JSON string
				},
			],
		});
		console.log("Message sent to Kafka:", message);
	} catch (error) {
		console.error("Error sending message to Kafka:", error);
	}
};

module.exports = sendMessage;
