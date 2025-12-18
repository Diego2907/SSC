import { Sequelize, Model, DataTypes } from "sequelize";
import dotenv from "dotenv";
import { Usuario } from "../../auth/repositories/auth.repository.js";

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

class Domicilio extends Model {}

Domicilio.init(
	{
		id_Domicilio: {
			type: DataTypes.STRING(255),
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		id_Usuario: {
			type: DataTypes.STRING(255),
			allowNull: false,
			references: {
				model: Usuario,
				key: "id_Usuario",
			},
		},
		codigo_Postal: {
			type: DataTypes.STRING(5),
			allowNull: false,
		},
		estado: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		municipio: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		colonia: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		calle: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		numero_Exterior: {
			type: DataTypes.STRING(6),
			allowNull: false,
		},
		numero_Interior: {
			type: DataTypes.STRING(6),
			allowNull: true,
		},
		referencias: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		domicilio_Principal: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "Domicilio",
		tableName: "domicilios",
		timestamps: false,
	}
);

export { Domicilio };
