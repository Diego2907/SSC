import type { Request, Response } from "express";
import * as authService from "../services/auth.services.js";
import env from "../../../config/env.config.js";

//? Controlador para registrar un nuevo usuario (Cliente)
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

//? ============================================================================
//? NUEVO: Controlador para registrar un Técnico
//? ============================================================================
const registerTechnical = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		// Validar contraseña de confirmación (Frontend Requirement)
		if (req.body.password && req.body.password !== req.body.password_confirmation) {
			res.status(400).json({
				message: "Validación fallida",
				errors: [
					{
						campo: "password_confirmation",
						mensaje: "La contraseña de confirmación no coincide",
					},
				],
			});
			return;
		}

		const result = await authService.registerTechnical(req.body);

		res.status(201).json({
			message: "Técnico registrado exitosamente",
			data: result,
		});
	} catch (error: any) {
		console.error("Error en registro de técnico:", error);

		if (error.message === "El correo ya está registrado") {
			res.status(400).json({
				message: "Validación fallida",
				errors: [{ campo: "email", mensaje: error.message }],
			});
			return;
		}

		res.status(500).json({
			message: "Error interno al registrar técnico",
			error: env.NODE_ENV === "development" ? error.message : undefined,
		});
	}
};

//? Controlador para iniciar sesión (Cliente)
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

//? ============================================================================
//? NUEVO: Controlador para Login de Técnico (Tradicional)
//? ============================================================================
const loginTechnical = async (req: Request, res: Response): Promise<void> => {
	try {
		// Soporte para ambos nombres de campo según doc y legacy
		const email = req.body.email || req.body.Correo;
		const password = req.body.password || req.body.Contrasenia;

		// Llamada al servicio
		const result = await authService.loginTechnicalUser({ email, password });

		// Cookie segura con el token
		res.cookie("token", result.token, {
			httpOnly: true,
			secure: env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 120 * 60 * 1000, // 2 horas
		});

		res.status(200).json({
			message: "Inicio de sesión exitoso",
			data: { token: result.token }, // Ajuste según doc
		});
	} catch (error: any) {
		console.error("Error en login técnico:", error);

		const isAuthError =
			error.message === "Credenciales inválidas" ||
			error.message === "La cuenta ha sido desactivada" ||
			error.message.includes("Debes iniciar sesión con");

		if (isAuthError) {
			res.status(400).json({
				message: error.message,
				errors: [
					{ campo: "email", mensaje: "Verifique sus credenciales" },
					{ campo: "password", mensaje: "Verifique sus credenciales" },
				],
			});
			return;
		}

		res.status(500).json({
			message: "Error interno al iniciar sesión",
			error: env.NODE_ENV === "development" ? error.message : undefined,
		});
	}
};

//? ============================================================================
//? NUEVO: Login Social (Google)
//? ============================================================================
const loginGoogle = async (req: Request, res: Response): Promise<void> => {
	try {
		const { token } = req.body;
		if (!token) {
			res.status(400).json({ message: "Token de Google requerido" });
			return;
		}

		const result = await authService.loginWithGoogle(token);

		if (result && typeof result === 'object' && 'token' in result) {
			res.cookie("token", result.token, {
				httpOnly: true,
				secure: env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 120 * 60 * 1000,
			});
		}

		res.status(200).json({
			message: "Inicio de sesión con Google exitoso",
			data: result,
		});
	} catch (error: any) {
		console.error("Error en login Google:", error);
		res.status(401).json({
			message: "Error al autenticar con Google",
			error: error.message,
		});
	}
};

//? ============================================================================
//? NUEVO: Login Social (Facebook)
//? ============================================================================
const loginFacebook = async (req: Request, res: Response): Promise<void> => {
	try {
		const { token } = req.body;
		if (!token) {
			res.status(400).json({ message: "Token de Facebook requerido" });
			return;
		}

		const result = await authService.loginWithFacebook(token);

		if (result && typeof result === 'object' && 'token' in result) {
			res.cookie("token", (result as { token: string }).token, {
				httpOnly: true,
				secure: env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 120 * 60 * 1000,
			});
		}

		res.status(200).json({
			message: "Inicio de sesión con Facebook exitoso",
			data: result,
		});
	} catch (error: any) {
		console.error("Error en login Facebook:", error);
		res.status(401).json({
			message: "Error al autenticar con Facebook",
			error: error.message,
		});
	}
};

const logout = (res: Response): void => {
	res.clearCookie("token");
	res.status(200).json({ message: "Sesión cerrada exitosamente" });
};

//? Controlador para obtener el perfil del usuario autenticado
const getProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		// El usuario autenticado está disponible en req.body.user (inyectado por el middleware)
		// O en (req as any).user según middleware
        const user = (req as any).user;
        
        // Si no hay usuario en request, intentar buscar por ID si viene en payload
		const userId = user?.id_Usuario || user?.id;

		if (!userId) {
			res.status(401).json({
				message: "Usuario no autenticado",
			});
			return;
		}

        // Si es técnico (tiene rol o id numérico), devolver datos de usuario inyectado
        if (user?.role === "technical") {
             res.status(200).json({
				message: "Perfil técnico obtenido",
				data: user,
			});
            return;
        }

        // Si es cliente (legacy), buscar en BD
		const userData = await authService.getUserById(userId);

		res.status(200).json({
			message: "Perfil obtenido exitosamente",
			data: userData,
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

export {
	register,
	registerTechnical,
	login,
	loginTechnical,
	loginGoogle,
	loginFacebook,
	logout,
	getProfile,
};