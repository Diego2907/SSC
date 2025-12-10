//? Importar Sequelize y dotenv para la configuracion de la base de datos
import { Sequelize, Model, DataTypes } from "sequelize";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

//? Configurar la conexion a la base de datos MySQL
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
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		Apellido_Paterno: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		Apellido_Materno: {
			type: DataTypes.STRING(100),
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
					const fecha = new Date().toLocaleDateString("en-CA");
					usuario.FechaConsentimiento = new Date(fecha);
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
	}
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
