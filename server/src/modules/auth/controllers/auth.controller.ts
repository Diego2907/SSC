import type { Request, Response } from "express";
import * as authService from "../services/auth.services.js";
import env from "../../../config/env.config.js";

//? Controlador para registrar un nuevo usuario
const register = async (req: Request, res: Response): Promise<void> => {
	try {
		const {
			Nombre,
			Apellido_Paterno,
			Apellido_Materno,
			Correo,
			Contrasenia,
			Telefono,
			Consentimiento,
		} = req.body;

		const userData: any = {
			Nombre,
			Apellido_Paterno,
			Apellido_Materno,
			Correo,
			Contrasenia,
			Telefono,
			Consentimiento,
		};

		const result = await authService.registerUser(userData);

		res.status(201).json({
			message: "Usuario registrado exitosamente",
			data: result,
		});
	} catch (error: any) {
		console.error("Error en registro:", error);

		// Manejar errores específicos
		if (
			error.message === "El correo ya está registrado" ||
			error.message === "El teléfono ya está registrado"
		) {
			res.status(409).json({
				message: error.message,
			});
			return;
		}

		res.status(500).json({
			message: "Error al registrar usuario",
			error: error.message,
		});
	}
};

//? Controlador para iniciar sesión
const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { Correo, Contrasenia } = req.body;

		const result = await authService.loginUser({
			Correo,
			Contrasenia,
		});

		// Establecer la cookie antes de enviar la respuesta
		res.cookie("token", result.token, {
			httpOnly: true,
			secure: env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 120 * 60 * 1000, // 2 horas
		});

		res.status(200).json({
			message: "Inicio de sesión exitoso",
			data: result,
		});
	} catch (error: any) {
		console.error("Error en login:", error);

		// Manejar errores de credenciales inválidas
		if (error.message === "Credenciales inválidas") {
			res.status(401).json({
				message: error.message,
			});
			return;
		}

		res.status(500).json({
			message: "Error al iniciar sesión",
			error: error.message,
		});
	}
};

const logout = (res: Response): void => {
	res.clearCookie("token");
	res.status(200).json({
		message: "Cierre de sesión exitoso",
	});
};

//!Controlador pendiente de revisar y probar
//? Controlador para obtener el perfil del usuario autenticado
const getProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		// El middleware de autenticación debe haber agregado el usuario al request
		const userId = (req as any).user?.id_Usuario;

		if (!userId) {
			res.status(401).json({
				message: "Usuario no autenticado",
			});
			return;
		}

		const user = await authService.getUserById(userId);

		res.status(200).json({
			message: "Perfil obtenido exitosamente",
			data: user,
		});
	} catch (error: any) {
		console.error("Error al obtener perfil:", error);

		if (error.message === "Usuario no encontrado") {
			res.status(404).json({
				message: error.message,
			});
			return;
		}

		res.status(500).json({
			message: "Error al obtener perfil",
			error: error.message,
		});
	}
};

//!Eliminar getProfile si no se va a usar
export { register, login, logout, getProfile };
