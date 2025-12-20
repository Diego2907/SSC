import { Sequelize, Model, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
	process.env.DB_USER_NAME || "database",
	process.env.DB_USER_USER || "username",
	process.env.DB_USER_PASSWORD || "password",
	{
		host: process.env.DB_USER_HOST || "localhost",
		dialect: "mysql",
		port: Number(process.env.DB_USER_PORT) || 3306,
	}
);
class CodigoPostal extends Model {}

CodigoPostal.init(
	{
		estado: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		municipio: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		rango_Inicio: {
			type: DataTypes.MEDIUMINT,
			allowNull: false,
			unique: true,
		},
		rango_Fin: {
			type: DataTypes.MEDIUMINT,
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize,
		modelName: "CodigoPostal",
		tableName: "codigos_postales",
		timestamps: false,
	}
);

export { CodigoPostal };
