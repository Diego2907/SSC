import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Middleware de validación genérico
export const validateSchema = (schema: z.ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		try {
			// Validar y parsear el body
			const parsed = schema.parse(req.body);
			req.body = parsed;
			next();
		} catch (error) {
			if (error instanceof z.ZodError) {
				// Formatear errores de Zod
				const errors = error.issues.map((err) => ({
					campo: err.path.join("."),
					mensaje: err.message,
				}));

				res.status(400).json({
					message: "Error de validación",
					errors,
				});
				return;
			}

			// Error inesperado
			res.status(500).json({
				message: "Error al validar los datos",
			});
		}
	};
};

// Schema para registro de usuario
const registerSchema = z
	.object({
		Nombre: z
			.string({ message: "El nombre debe ser un texto" })
			.min(1, "El nombre no puede estar vacío")
			.max(50, "El nombre no puede exceder 50 caracteres")
			.trim(),

		Apellido_Paterno: z
			.string({ message: "El apellido paterno debe ser un texto" })
			.min(1, "El apellido paterno no puede estar vacío")
			.max(30, "El apellido paterno no puede exceder 30 caracteres")
			.trim(),

		Apellido_Materno: z
			.string({ message: "El apellido materno debe ser un texto" })
			.min(1, "El apellido materno no puede estar vacío")
			.max(30, "El apellido materno no puede exceder 30 caracteres")
			.trim(),

		Correo: z
			.string({ message: "El correo debe ser un texto" })
			.min(1, "El correo es requerido")
			.email("El correo no tiene un formato válido")
			.max(100, "El correo no puede exceder 100 caracteres")
			.toLowerCase()
			.trim(),

		Contrasenia: z
			.string({ message: "La contraseña debe ser un texto" })
			.min(8, "La contraseña debe tener al menos 8 caracteres")
			.max(255, "La contraseña no puede exceder 255 caracteres")
			.regex(
				/[A-Z]/,
				"La contraseña debe contener al menos una letra mayúscula",
			)
			.regex(
				/[a-z]/,
				"La contraseña debe contener al menos una letra minúscula",
			)
			.regex(/[0-9]/, "La contraseña debe contener al menos un número")
			.regex(
				/[\W_]/,
				"La contraseña debe contener al menos un carácter especial",
			),

		ConfirmarContrasenia: z
			.string({ message: "La confirmación de contraseña debe ser un texto" })
			.min(8, "La confirmación debe tener al menos 8 caracteres")
			.max(255, "La confirmación no puede exceder 255 caracteres"),

		Telefono: z
			.string({ message: "El teléfono debe ser un texto" })
			.length(10, "El teléfono debe tener exactamente 10 dígitos"),

		Consentimiento: z.boolean().default(true),
	})
	.refine((data) => data.Contrasenia === data.ConfirmarContrasenia, {
		message: "Las contraseñas no coinciden",
		path: ["ConfirmarContrasenia"],
	});

// Schema para login de usuario
const loginSchema = z.object({
	Correo: z
		.string({ message: "El correo debe ser un texto" })
		.min(1, "El correo es requerido")
		.email("El correo no tiene un formato válido")
		.toLowerCase()
		.trim(),

	Contrasenia: z
		.string({ message: "La contraseña debe ser un texto" })
		.min(8, "La contraseña debe contener al menos 8 caracteres"),
});

//? Esquema de Validación para Registro de Técnicos
const registerTechnicalSchema = z
	.object({
		nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
		apellido_paterno: z
			.string()
			.min(2, "El apellido paterno debe tener al menos 2 caracteres"),
		apellido_materno: z
			.string()
			.min(2, "El apellido materno debe tener al menos 2 caracteres"),
		email: z.string().email("Formato de correo inválido"),
		telefono: z
			.string()
			.regex(/^[0-9]{10}$/, "El teléfono debe tener exactamente 10 dígitos"),
		// Validación compleja de contraseña (Mayúscula, minúscula, número, especial)
		password: z
			.string()
			.min(8, "La contraseña debe tener al menos 8 caracteres")
			.regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
			.regex(/[a-z]/, "Debe contener al menos una letra minúscula")
			.regex(/[0-9]/, "Debe contener al menos un número")
			.regex(
				/[!@#$%+\-=]/,
				"Debe contener al menos un carácter especial (!@#$%+-=)",
			),
		password_confirmation: z.string(),
		terms_accepted: z.boolean().optional(),
	})
	//? Refinamiento: Comparación de contraseñas
	//? Asegura que password y password_confirmation sean idénticos.
	.refine((data) => data.password === data.password_confirmation, {
		message: "Las contraseñas no coinciden",
		path: ["password_confirmation"],
	});

//? Esquema para cambio de contraseña (Técnicos)
const changePasswordSchema = z
	.object({
		current_password: z.string().min(1, "La contraseña actual es requerida"),
		new_password: z
			.string()
			.min(8, "La nueva contraseña debe tener al menos 8 caracteres")
			.regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
			.regex(/[a-z]/, "Debe contener al menos una letra minúscula")
			.regex(/[0-9]/, "Debe contener al menos un número")
			.regex(
				/[!@#$%+\-=]/,
				"Debe contener al menos un carácter especial (!@#$%+-=)",
			),
		new_password_confirmation: z.string(),
	})
	.refine((data) => data.new_password === data.new_password_confirmation, {
		message: "Las contraseñas no coinciden",
		path: ["new_password_confirmation"],
	});

// Middlewares específicos
export const validateRegister = validateSchema(registerSchema);
export const validateLogin = validateSchema(loginSchema);
export const validateRegisterTechnical = validateSchema(registerTechnicalSchema);
export const validateChangePassword = validateSchema(changePasswordSchema);
