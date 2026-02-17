import { TechnicalUser } from "../repositories/technical-user.repository.js";
import bcrypt from "bcrypt";

//? Obtener Perfil del Técnico
export const getTechnicalUserProfile = async (id: number) => {
	const user = await TechnicalUser.findByPk(id, {
		attributes: { exclude: ["password"] },
	});
	if (!user) throw new Error("Usuario no encontrado");
	return user;
};

//? Actualizar Perfil (Información General)
export const updateTechnicalUserProfile = async (id: number, data: any) => {
	const user = await TechnicalUser.findByPk(id);
	if (!user) throw new Error("Usuario no encontrado");

	// Campos permitidos para actualización general
	const allowedFields = [
		"nombre",
		"apellido_paterno",
		"apellido_materno",
		"email", // Agregado email
		"telefono",
		"profile_image_url",
		"language",
		"currency",
	];
	const updateData: any = {};

	Object.keys(data).forEach((key) => {
		if (allowedFields.includes(key)) {
			updateData[key] = data[key];
		}
	});

	await user.update(updateData);
	// Retornar usuario sin password
	return getTechnicalUserProfile(id);
};

//? Actualizar Configuración Operativa (Monitoreo y Vacaciones)
export const updateMonitoringSettings = async (id: number, data: any) => {
	const user = await TechnicalUser.findByPk(id);
	if (!user) throw new Error("Usuario no encontrado");

	const allowedFields = [
		"monitoring_enabled",
		"monitoring_shift",
		"monitoring_days",
		"vacation_mode",
	];
	const updateData: any = {};

	Object.keys(data).forEach((key) => {
		if (allowedFields.includes(key)) {
			updateData[key] = data[key];
		}
	});

	// El hook beforeUpdate en el modelo se encarga de:
	// Si vacation_mode = true -> monitoring_enabled = false
	await user.update(updateData);
	
    return getTechnicalUserProfile(id);
};

//? Actualizar Configuración de Seguridad
export const updateSecuritySettings = async (id: number, data: any) => {
	const user = await TechnicalUser.findByPk(id);
	if (!user) throw new Error("Usuario no encontrado");

	// Validar y cambiar contraseña
	if (data.new_password) {
		if (!data.current_password) {
			throw new Error("La contraseña actual es requerida para establecer una nueva.");
		}
        // @ts-ignore
		const isMatch = await bcrypt.compare(data.current_password, user.password);
		if (!isMatch) {
			throw new Error("La contraseña actual es incorrecta.");
		}
		// @ts-ignore
        user.password = data.new_password; // El hook se encargará de hashearlo
	}

	if (data.two_factor_enabled !== undefined) {
		// @ts-ignore
        user.two_factor_enabled = data.two_factor_enabled;
	}

	if (data.secondary_email !== undefined) {
		// @ts-ignore
        user.secondary_email = data.secondary_email;
	}

	if (data.recovery_phone !== undefined) {
		// @ts-ignore
        user.recovery_phone = data.recovery_phone;
	}

	await user.save();
	return { message: "Configuración de seguridad actualizada correctamente" };
};

//? Validar Contraseña Actual
export const validateCurrentPassword = async (id: number, password: string) => {
	const user = await TechnicalUser.findByPk(id);
	if (!user) throw new Error("Usuario no encontrado");

    // @ts-ignore
	const isMatch = await bcrypt.compare(password, user.password);
	return { isValid: isMatch };
};
