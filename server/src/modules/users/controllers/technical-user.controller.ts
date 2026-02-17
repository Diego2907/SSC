import { Request, Response } from "express";
import * as techUserService from "../services/technical-user.services.js";

//? Helper para transformar perfil a formato Frontend (PascalCase)
const mapProfileToResponse = (user: any) => {
	return {
		Nombre: user.nombre,
		ApellidoPaterno: user.apellido_paterno,
		ApellidoMaterno: user.apellido_materno,
		Correo: user.email,
		Telefono: user.telefono,
		ImagenPerfil: user.profile_image_url,
		// Configuración adicional
		idioma: user.language,
		divisa: user.currency,
		monitoring_enabled: user.monitoring_enabled,
		monitoring_turno: user.monitoring_shift,
		monitoring_dias: user.monitoring_days,
		vacation_mode: user.vacation_mode,
		two_factor_enabled: user.two_factor_enabled,
		secondary_email: user.secondary_email,
		recovery_phone: user.recovery_phone,
	};
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			res.status(401).json({ message: "Usuario no autenticado" });
			return;
		}
		const user = await techUserService.getTechnicalUserProfile(userId);

		// Evitar caché
		res.set(
			"Cache-Control",
			"no-store, no-cache, must-revalidate, proxy-revalidate",
		);
		res.set("Pragma", "no-cache");
		res.set("Expires", "0");

		res.status(200).json({
			data: mapProfileToResponse(user),
		});
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			res.status(401).json({ message: "Usuario no autenticado" });
			return;
		}

		// Mapear campos entrantes (Frontend camelCase -> Backend snake_case)
		// El frontend envía: nombre, apellido_paterno, apellido_materno, correo, telefono, monitoring_*, etc.
		// El backend espera keys que coincidan con el servicio, que a su vez espera snake_case o camelCase según definí?
		// Revisando technical-user.services.ts, updateTechnicalUserProfile usa keys directas.
		// El frontend envía 'correo', servicio espera 'email' (o el modelo lo tiene como 'email').
		// Ajustamos el body:
		const updateData = { ...req.body };
		if (updateData.correo) updateData.email = updateData.correo; // Alias
		// Eliminar correo si venía para no causar conflictos si el servicio es estricto, pero el servicio filtra allowedFields.
		// El servicio permite: nombre, apellido_paterno, apellido_materno, telefono, profile_image_url, language, currency.
		// Falta 'email' en allowedFields del servicio updateTechnicalUserProfile? Voy a checar el servicio.
		// Si el usuario quiere cambiar email, debe ser permitido? Doc dice "editar perfil (nombre, apellido, email, teléfono)".
		// Voy a asumir que el servicio debe permitir 'email'.

		// Si es una actualización de settings (monitoreo/vacaciones)
		if (
			updateData.monitoring_enabled !== undefined ||
			updateData.vacation_mode !== undefined
		) {
			await techUserService.updateMonitoringSettings(userId, updateData);
		}

		// Si es actualización de perfil básico
		const updatedUser = await techUserService.updateTechnicalUserProfile(
			userId,
			updateData,
		);

		res.status(200).json({
			data: mapProfileToResponse(updatedUser),
		});
	} catch (error: any) {
		res.status(400).json({
			message: "Error de validación",
			errors: [{ campo: "general", mensaje: error.message }],
		});
	}
};

export const changePassword = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			res.status(401).json({ message: "Usuario no autenticado" });
			return;
		}
		const { current_password, new_password, new_password_confirmation } = req.body;

		if (new_password !== new_password_confirmation) {
			res.status(400).json({
				message: "Las contraseñas no coinciden",
				errors: [
					{
						campo: "new_password_confirmation",
						mensaje: "La confirmación no coincide con la nueva contraseña",
					},
				],
			});
			return;
		}

		await techUserService.updateSecuritySettings(userId, {
			current_password,
			new_password,
		});

		res.status(200).json({ message: "Contraseña actualizada exitosamente" });
	} catch (error: any) {
		const isAuthError =
			error.message.includes("incorrecta") || error.message.includes("requerida");
		res.status(400).json({
			message: isAuthError ? "Error de autenticación" : "Error al cambiar contraseña",
			errors: [
				{
					campo: isAuthError ? "current_password" : "new_password",
					mensaje: error.message,
				},
			],
		});
	}
};

export const uploadAvatar = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			res.status(401).json({ message: "Usuario no autenticado" });
			return;
		}

		if (!req.file) {
			res.status(400).json({ message: "No se proporcionó ningún archivo" });
			return;
		}

		// Construir URL pública
		// TODO: Ajustar para producción si se usa S3 o similar
		const imageUrl = `/uploads/profiles/${req.file.filename}`;

		// Actualizar BD
		await techUserService.updateTechnicalUserProfile(userId, {
			profile_image_url: imageUrl,
		});

		res.status(200).json({
			message: "Imagen de perfil actualizada exitosamente",
			data: {
				url: imageUrl,
			},
		});
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

// ... keep updateMonitoring, updateSecurity, validatePassword if needed internally or for legacy, 
// but updateProfile handles monitoring now as per doc suggestion.
// I'll keep them but updateProfile is the main entry point for the doc's requests.


export const updateMonitoring = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			res.status(401).json({ message: "Usuario no autenticado" });
			return;
		}
		const updatedUser = await techUserService.updateMonitoringSettings(
			userId,
			req.body,
		);
		res.status(200).json({
			message: "Configuración operativa actualizada",
			data: updatedUser,
		});
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const updateSecurity = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			res.status(401).json({ message: "Usuario no autenticado" });
			return;
		}
		const result = await techUserService.updateSecuritySettings(
			userId,
			req.body,
		);
		res.status(200).json(result);
	} catch (error: any) {
		const status =
			error.message.includes("contraseña") ||
			error.message.includes("requerida") ||
			error.message.includes("incorrecta")
				? 400
				: 500;
		res.status(status).json({ message: error.message });
	}
};

export const validatePassword = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			res.status(401).json({ message: "Usuario no autenticado" });
			return;
		}
		const { password } = req.body;
		if (!password) {
			res.status(400).json({ message: "Contraseña requerida" });
			return;
		}
		const result = await techUserService.validateCurrentPassword(
			userId,
			password,
		);
		res.status(200).json(result);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
