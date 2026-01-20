import { cleanEnv, str, port } from "envalid";
import dotenv from "dotenv";
dotenv.config();

const env = cleanEnv(process.env, {
	//?CONFIGURACIÓN DEL SERVIDOR
	PORT: port(),
	NODE_ENV: str({ choices: ["development", "production", "test"] }),

	//?API KEYS
	DIPOMEX_KEY: str(),

	//?SEGURIDAD Y SECRETOS
	JWT_SECRET: str(),
	JWT_EXPIRES_IN: str(),

	//?BASE DE DATOS USUARIOS
	DB_USER_HOST: str(),
	DB_USER_PORT: port(),
	DB_USER_USER: str(),
	DB_USER_PASSWORD: str(),
	DB_USER_NAME: str(),
});

export default env;
