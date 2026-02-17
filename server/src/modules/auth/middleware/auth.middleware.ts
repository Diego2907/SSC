import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/auth.services.js";

// Extender la interfaz Request para incluir el usuario
declare global {
	namespace Express {
		interface Request {
			user?: {
				id_Usuario: string;
				Correo: string;
				// id?: number;
				// email?: string;
				// role?: "client" | "technical";
			};
		}
	}
}

// Middleware para autenticar peticiones usando JWT
export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	try {
		const token = req.cookies?.token;

		if (!token) {
			res.status(401).json({
				message: "Token no proporcionado. Debe iniciar sesión",
			});
			return;
		}

		const decoded = verifyToken(token);

		req.user = {
			id_Usuario: decoded.id_Usuario!, // Aseguramos que existe para TS
			Correo: decoded.Correo!,
			// id: decoded.id,
			// email: decoded.email,
			// role: decoded.role,
		};
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
