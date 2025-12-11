import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/auth.services.js";

// Extender la interfaz Request para incluir el usuario
declare global {
	namespace Express {
		interface Request {
			user?: {
				id_Usuario: string;
				Correo: string;
			};
		}
	}
}

// Middleware para autenticar peticiones usando JWT
export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	try {
		// Obtener el token del header Authorization
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			res.status(401).json({
				message: "Token no proporcionado",
			});
			return;
		}

		// El formato esperado es: "Bearer <token>"
		const parts = authHeader.split(" ");

		if (parts.length !== 2 || parts[0] !== "Bearer") {
			res.status(401).json({
				message: "Formato de token inválido. Use: Bearer <token>",
			});
			return;
		}

		const token = parts[1];

		if (!token) {
			res.status(401).json({
				message: "Token vacío",
			});
			return;
		}

		// Verificar el token
		const decoded = verifyToken(token);

		// Agregar el usuario decodificado al request
		req.user = {
			id_Usuario: decoded.id_Usuario,
			Correo: decoded.Correo,
		};

		// Continuar al siguiente middleware/controlador
		next();
	} catch (error: any) {
		console.error("Error en autenticación:", error);

		if (error.message === "Token inválido o expirado") {
			res.status(401).json({
				message: error.message,
			});
			return;
		}

		res.status(500).json({
			message: "Error al verificar autenticación",
			error: error.message,
		});
	}
};

// Middleware opcional para autenticación (no falla si no hay token)
export const optionalAuthenticate = (
	req: Request,
	// res: Response,
	next: NextFunction
): void => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			// No hay token, pero continuar de todos modos
			next();
			return;
		}

		const parts = authHeader.split(" ");

		if (parts.length === 2 && parts[0] === "Bearer") {
			const token = parts[1];

			if (token) {
				try {
					const decoded = verifyToken(token);
					req.user = {
						id_Usuario: decoded.id_Usuario,
						Correo: decoded.Correo,
					};
				} catch (error) {
					// Token inválido, pero continuar sin usuario
					console.warn("Token inválido en autenticación opcional:", error);
				}
			}
		}

		next();
	} catch (error) {
		// En caso de error, continuar sin usuario
		next();
	}
};
