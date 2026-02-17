import { cleanEnv, str, port } from "envalid";
import dotenv from "dotenv";
dotenv.config();

const env = cleanEnv(process.env, {
	//?CONFIGURACIÓN DEL SERVIDOR
	PORT: port(),
	NODE_ENV: str({ choices: ["development", "production", "test"] }),

	//?API KEYS
	DIPOMEX_KEY: str(),

	//? LOGIN SOCIAL (Google & Facebook)
	//? Se marcan como opcionales (default: "") para no bloquear el desarrollo local
	//? si no se tienen las credenciales a mano.
	GOOGLE_CLIENT_ID: str({ default: "" }),
	FACEBOOK_APP_ID: str({ default: "" }),

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
