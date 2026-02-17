import { z } from "zod";

//? Esquemas de validación existentes...
export const registerSchema = z.object({
	Nombre: z.string().min(1, "El nombre es obligatorio"),
	Apellido_Paterno: z.string().min(1, "El apellido paterno es obligatorio"),
	Apellido_Materno: z.string().min(1, "El apellido materno es obligatorio"),
	Correo: z.string().email("Debe ser un correo válido"),
	Contrasenia: z
		.string()
		.min(6, "La contraseña debe tener al menos 6 caracteres"),
	Telefono: z.string().min(10, "El teléfono debe tener 10 dígitos"),
	Consentimiento: z.boolean().optional(),
});

export const loginSchema = z.object({
	Correo: z.string().email("Debe ser un correo válido"),
	Contrasenia: z.string().min(1, "La contraseña es obligatoria"),
});


//? Esquema de Validación para Registro de Técnicos
export const registerTechnicalSchema = z
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

//? Middleware Genérico de Validación
//? Recibe un esquema Zod, valida el body de la petición y pasa al siguiente middleware
//? o devuelve un error 400 formateado si la validación falla.
export const validateSchema =
	(schema: z.ZodSchema) => (req: any, res: any, next: any) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				return res.status(400).json({
					message: "Error de validación",
					errors: error.issues.map((e: any) => ({
						field: e.path[0],
						message: e.message,
					})),
				});
			}
			next(error);
		}
	};

export const validateRegister = validateSchema(registerSchema);
export const validateLogin = validateSchema(loginSchema);

export const validateRegisterTechnical = validateSchema(registerTechnicalSchema);
