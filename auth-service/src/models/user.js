const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
	"User", // This is the model name
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		googleId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		mobileNumber: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize, // Pass the `sequelize` instance here
		modelName: "Users", // Define the model name
		tableName: "Users", // Explicitly set the table name
		timestamps: true, // Automatically adds `createdAt` and `updatedAt`
	}
);

module.exports = User;
