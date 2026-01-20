import { Sequelize, Model, DataTypes } from "sequelize";
import { Usuario } from "../../auth/repositories/auth.repository.js";
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
	},
);

export { Domicilio };
