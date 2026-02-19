import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/auth.services.js";

// Extender la interfaz Request para incluir el usuario
declare global {
	namespace Express {
		interface Request {
			user?: {
				id_Usuario?: string | undefined;
				Correo?: string | undefined;
                id?: number | undefined;
				email?: string | undefined;
				role?: "client" | "technical" | undefined;
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
        // Intentar leer de cookie o header Authorization
		let token = req.cookies?.token;

        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

		if (!token) {
			res.status(401).json({
				message: "Token no proporcionado. Debe iniciar sesión",
			});
			return;
		}

		const decoded = verifyToken(token);

        // Mapear campos según rol o estructura del token
		req.user = {
			id_Usuario: decoded.id_Usuario,
			Correo: decoded.Correo,
            id: decoded.id,
			email: decoded.email,
			role: decoded.role,
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
