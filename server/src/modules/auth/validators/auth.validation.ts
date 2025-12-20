import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

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
			.max(255, "La contraseña no puede exceder 255 caracteres"),

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

// Middleware de validación genérico
const validate = (schema: z.ZodSchema) => {
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

// Middlewares específicos
const validateRegister = validate(registerSchema);
const validateLogin = validate(loginSchema);

export { validateRegister, validateLogin };
