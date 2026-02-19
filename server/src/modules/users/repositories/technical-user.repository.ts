import { Model, DataTypes, Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import env from "../../../config/env.config.js";

//? Configuración de Base de Datos para el Módulo de Técnicos
const sequelize = new Sequelize(
	env.DB_USER_NAME,
	env.DB_USER_USER,
	env.DB_USER_PASSWORD,
	{
		host: env.DB_USER_HOST,
		dialect: "mysql",
		port: env.DB_USER_PORT,
		timezone: "-06:00",
		logging: false,
	},
);

//? Definición del Modelo TechnicalUser
//? Representa la tabla 'technical_users' en la base de datos.
class TechnicalUser extends Model {}

TechnicalUser.init(
	{
		// Identificador único auto-incremental
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		// Información Personal
		nombre: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		apellido_paterno: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		apellido_materno: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		// Información de Contacto y Acceso
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true, // Restricción única a nivel de BD
			validate: {
				isEmail: true, // Validación básica de Sequelize
			},
		},
		telefono: {
			type: DataTypes.STRING(10),
			allowNull: false,
			validate: {
				is: /^[0-9]{10}$/, // Asegura exactamente 10 dígitos numéricos
			},
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: true, // Permitir nulo para usuarios de Google/Facebook
		},
		//? NUEVO: Proveedor de autenticación (Requisito Login Social)
		provider: {
			type: DataTypes.ENUM("local", "google", "facebook"),
			allowNull: false,
			defaultValue: "local",
		},
		// Control de Términos y Estado
		terms_accepted: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			validate: {
				isTrue(value: boolean) {
					if (value !== true) {
						throw new Error("Debe aceptar los términos y condiciones.");
					}
				},
			},
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true, // Activo por defecto al registrarse
		},
		//? Información de Perfil
		profile_image_url: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		//? Configuración Operativa (Monitoreo y Vacaciones)
		monitoring_enabled: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		monitoring_shift: {
			type: DataTypes.ENUM("morning", "afternoon"), // Matutino, Vespertino
			allowNull: true,
		},
		monitoring_days: {
			type: DataTypes.ENUM("weekdays", "weekends"), // Entre semana, Fines de semana
			allowNull: true,
		},
		vacation_mode: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		//? Seguridad y Configuración Adicional
		two_factor_enabled: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		secondary_email: {
			type: DataTypes.STRING(100),
			allowNull: true,
			validate: {
				isEmail: true,
				notSameAsPrimary(value: string) {
					if (value && this.email && value === this.email) {
						throw new Error("El email secundario no puede ser igual al primario.");
					}
				},
			},
		},
		recovery_phone: {
			type: DataTypes.STRING(10),
			allowNull: true,
			validate: {
				is: /^[0-9]{10}$/,
			},
		},
		//? Localización
		language: {
			type: DataTypes.STRING(10),
			defaultValue: "es-MX",
		},
		currency: {
			type: DataTypes.STRING(3),
			defaultValue: "MXN",
		},
	},
	{
		sequelize, // Usamos la instancia compartida
		modelName: "TechnicalUser",
		tableName: "technical_users",
		timestamps: true, // Crea columnas createdAt y updatedAt automáticamente
		hooks: {
			//? Hook: Before Create
			//? Se ejecuta antes de insertar un nuevo registro.
			//? Hashea la contraseña para seguridad.
			beforeCreate: async (user: any) => {
				if (user.password) {
					const salt = await bcrypt.genSalt(10);
					user.password = await bcrypt.hash(user.password, salt);
				}
			},
			//? Hook: Before Update
			//? Se ejecuta antes de actualizar un registro existente.
			//? Re-hashea la contraseña solo si ha sido modificada.
			beforeUpdate: async (user: any) => {
				if (user.changed("password") && user.password) {
					const salt = await bcrypt.genSalt(10);
					user.password = await bcrypt.hash(user.password, salt);
				}
				//? Lógica de Vacaciones: Si se activan vacaciones, desactivar monitoreo
				if (user.changed("vacation_mode") && user.vacation_mode === true) {
					user.monitoring_enabled = false;
				}
			},
		},
	},
);

//? Sincronización Automática
//? Crea la tabla si no existe al cargar este archivo.
//? Nota: 'alter: true' actualizará la tabla existente agregando la columna 'provider'
TechnicalUser.sync({ alter: true });

export { TechnicalUser };
