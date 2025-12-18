import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

const domicilioSchema = z.object({
	id_Usuario: z
		.string({ message: "El ID de usuario debe ser un texto" })
		.uuid("El ID de usuario debe ser un UUID válido"),
	codigo_Postal: z
		.string({ message: "El código postal debe ser un texto" })
		.length(5, "El código postal debe tener exactamente 5 caracteres"),
	estado: z
		.string({ message: "El estado debe ser un texto" })
		.min(1, "El estado no puede estar vacío")
		.max(15, "El estado no puede exceder 15 caracteres")
		.toLowerCase(),
	municipio: z
		.string({ message: "El municipio debe ser un texto" })
		.min(1, "El municipio no puede estar vacío")
		.max(25, "El municipio no puede exceder 25 caracteres")
		.toLowerCase(),
	colonia: z
		.string({ message: "La colonia debe ser un texto" })
		.min(1, "La colonia no puede estar vacía")
		.max(50, "La colonia no puede exceder 50 caracteres")
		.toLowerCase(),
	calle: z
		.string({ message: "La calle debe ser un texto" })
		.min(1, "La calle no puede estar vacía")
		.max(100, "La calle no puede exceder 100 caracteres")
		.toLowerCase(),
	numero_Exterior: z
		.string({ message: "El número exterior debe ser un texto" })
		.min(1, "El número exterior no puede estar vacío")
		.max(10, "El número exterior no puede exceder 10 caracteres"),
	numero_Interior: z
		.string({ message: "El número interior debe ser un texto" })
		.max(10, "El número interior no puede exceder 10 caracteres")
		.optional(),
	referencias: z
		.string({ message: "Las referencias deben ser un texto" })
		.max(255, "Las referencias no pueden exceder 255 caracteres")
		.optional(),
	domicilio_Principal: z.boolean(),
});

const actualizarDomicilioSchema = z.object({
	referencias: z
		.string({ message: "Las referencias deben ser un texto" })
		.max(255, "Las referencias no pueden exceder 255 caracteres")
		.optional(),
	domicilio_Principal: z.boolean(),
});

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

const validarAgregarDomicilio = validate(domicilioSchema);
const validarActualizarDomicilio = validate(actualizarDomicilioSchema);

export { validarAgregarDomicilio, validarActualizarDomicilio };
