import { Sequelize, Model, DataTypes } from "sequelize";
import env from "../../../config/env.config.js";

const sequelize = new Sequelize(
	env.DB_USER_NAME,
	env.DB_USER_USER,
	env.DB_USER_PASSWORD,
	{
		host: env.DB_USER_HOST,
		dialect: "mysql",
		port: env.DB_USER_PORT,
	},
);
class CodigoPostal extends Model {}

CodigoPostal.init(
	{
		id_CP: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
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
	},
);

export { CodigoPostal };
