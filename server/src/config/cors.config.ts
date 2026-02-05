import type { CorsOptions } from "cors";

const allowedProdOrigins: string[] = [
	"https://www.shc.com.mx",
	"https://shc.com.mx",
	"https://staging.shc.com.mx",
	"http://staging.shc.com.mx", // Temporal hasta configurar SSL
];

const allowedDevOrigins: string[] = [
	"http://localhost:3000",
	"http://localhost:5173",
];

const allowedHeaders: string[] = ["Content-Type", "Authorization"];

const exposedHeaders: string[] = [
	"X-Total-Count",
	"X-Auth-Token",
	"X-RateLimit-Remaining",
];

const allowedMethods: string[] = [
	"GET",
	"POST",
	"PUT",
	"DELETE",
	"PATCH",
	"OPTIONS",
];

//? Configuración CORS para desarrollo
const corsDevOptions: CorsOptions = {
	origin: (origin, callback) => {
		// Permitir requests sin origin (Postman, curl, etc.) solo en desarrollo
		if (!origin) {
			return callback(null, true);
		}

		if (allowedDevOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error(`Origin ${origin} no permitido por CORS`));
		}
	},
	methods: allowedMethods,
	allowedHeaders: allowedHeaders,
	exposedHeaders: exposedHeaders,
	credentials: true,
	maxAge: 1200, // 20 minutos
	optionsSuccessStatus: 200,
};

//? Configuración CORS para producción
const corsProdOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (!origin) {
			return callback(new Error("Origin requerido"));
		}

		if (allowedProdOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("No permitido por CORS"));
		}
	},
	methods: allowedMethods,
	allowedHeaders: allowedHeaders,
	exposedHeaders: exposedHeaders,
	credentials: true,
	maxAge: 86400, // 24 horas
	optionsSuccessStatus: 200,
};

export { corsDevOptions, corsProdOptions };
