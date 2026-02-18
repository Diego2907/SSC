import { Sequelize } from "sequelize";
import env from "./env.config.js";

//? Instancia única de Sequelize para toda la aplicación
const sequelize = new Sequelize(
	env.DB_USER_NAME,
	env.DB_USER_USER,
	env.DB_USER_PASSWORD,
	{
		host: env.DB_USER_HOST,
		dialect: "mysql",
		port: env.DB_USER_PORT,
		timezone: "-06:00",
		logging: env.NODE_ENV === "development" ? console.log : false,
	},
);

//? Verificar la conexión a la base de datos
async function testConnection() {
	try {
		await sequelize.authenticate();
		console.log("✅ Conexión a la base de datos establecida correctamente.");
	} catch (error: unknown) {
		console.error("❌ No se pudo conectar a la base de datos.");
		console.error(`   Intentando conectar a: ${env.DB_USER_HOST}:${env.DB_USER_PORT} (base: ${env.DB_USER_NAME})`);
		if (error && typeof error === "object" && "code" in error && error.code === "ECONNREFUSED") {
			console.error("\n💡 Posibles soluciones:");
			console.error("   1. Asegúrate de que MySQL esté corriendo (servicio iniciado).");
			console.error("   2. Verifica que el puerto en .env (DB_USER_PORT) coincida con el de MySQL (ej. 3307).");
			console.error("   3. Ejecuta: npm run verify-db  para comprobar la conexión.");
		}
		console.error("");
		process.exit(1);
	}
}

//? Inicializar conexión al arrancar el servidor
if (process.env.NODE_ENV !== "test") {
	testConnection();
}

export default sequelize;
