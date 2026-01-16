import { Sequelize, Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import env from "../../../config/env.js";

//? Configurar la conexion a la base de datos MySQL
const sequelize = new Sequelize(
	env.DB_USER_NAME,
	env.DB_USER_USER,
	env.DB_USER_PASSWORD,
	{
		host: env.DB_USER_HOST,
		dialect: "mysql",
		port: env.DB_USER_PORT,
		timezone: "-06:00",
	},
);

class Usuario extends Model {}

Usuario.init(
	{
		id_Usuario: {
			type: DataTypes.STRING(255),
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		Nombre: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		Apellido_Paterno: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		Apellido_Materno: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		Correo: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
		},
		Contrasenia: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		Telefono: {
			type: DataTypes.STRING(10),
			allowNull: false,
			unique: true,
		},
		Consentimiento: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
		},
		FechaConsentimiento: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		sequelize,
		modelName: "Usuario",
		tableName: "usuarios",
		timestamps: false,
		hooks: {
			// Hook que se ejecuta antes de crear un usuario
			beforeCreate: async (usuario: any) => {
				if (usuario.Contrasenia) {
					const salt = await bcrypt.genSalt(10);
					usuario.Contrasenia = await bcrypt.hash(usuario.Contrasenia, salt);
				}

				if (usuario.Consentimiento) {
					// Obtener la fecha y hora en la zona horaria de Ciudad de México (UTC-6)
					const fechaMexico = new Date().toLocaleString("en-US", {
						timeZone: "America/Mexico_City",
					});
					// Convertir al formato compatible con MySQL DATETIME
					usuario.FechaConsentimiento = new Date(fechaMexico);
				} else {
					usuario.FechaConsentimiento = null;
				}
			},
			// Hook que se ejecuta antes de actualizar un usuario
			beforeUpdate: async (usuario: any) => {
				if (usuario.changed("Contrasenia") && usuario.Contrasenia) {
					const salt = await bcrypt.genSalt(10);
					usuario.Contrasenia = await bcrypt.hash(usuario.Contrasenia, salt);
				}
			},
		},
	},
);

//? Verificar la conexion a la base de datos
async function testConnection() {
	try {
		await sequelize.authenticate();
		console.log("Conexion a la base de datos establecida correctamente.");
	} catch (error) {
		console.error("No se pudo conectar a la base de datos:", error);
	}
}
testConnection();

export { Usuario };
