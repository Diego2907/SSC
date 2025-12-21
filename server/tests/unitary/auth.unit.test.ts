import { registerSchema } from "../../src/modules/auth/validators/auth.validation.js";

describe("Validaciones de registro de usuario", () => {
	it("debería validar un registro con datos correctos", () => {
		// Arrange: Preparar datos válidos
		const datosValidos = {
			Nombre: "Juan",
			Apellido_Paterno: "Pérez",
			Apellido_Materno: "García",
			Correo: "juan.perez@ejemplo.com",
			Contrasenia: "MiPassword123",
			ConfirmarContrasenia: "MiPassword123",
			Telefono: "5512345678",
			Consentimiento: true,
		};

		// Act: Ejecutar la validación
		const resultado = registerSchema.safeParse(datosValidos);

		// Assert: Verificar que la validación fue exitosa
		expect(resultado.success).toBe(true);
		if (resultado.success) {
			expect(resultado.data.Nombre).toBe("Juan");
			expect(resultado.data.Correo).toBe("juan.perez@ejemplo.com");
		}
	});

	it("debería fallar cuando todos los campos estan vacios", () => {
		// Arrange: Preparar datos con nombre vacío
		const datosInvalidos = {
			Nombre: "",
			Apellido_Paterno: "",
			Apellido_Materno: "",
			Correo: "",
			Contrasenia: "",
			ConfirmarContrasenia: "",
			Telefono: "",
			Consentimiento: "true",
		};

		// Act: Ejecutar la validación
		const resultado = registerSchema.safeParse(datosInvalidos);

		// Assert: Verificar que la validación falló
		expect(resultado.success).toBe(false);
		if (!resultado.success) {
			expect(resultado.error.issues[0].path).toContain("Nombre");
			expect(resultado.error.issues[0].message).toBe(
				"El nombre no puede estar vacío"
			);
		}
	});

	// //!Modificar para que sirva con la validacion de correo (nodemailer)
	// it("debería fallar al validar un registro con correo inválido", () => {
	// 	// Arrange: Preparar datos con correo inválido
	// 	const datosInvalidos = {
	// 		Nombre: "Juan",
	// 		Apellido_Paterno: "Pérez",
	// 		Apellido_Materno: "García",
	// 		Correo: "correo-invalido",
	// 		Contrasenia: "MiPassword123",
	// 		ConfirmarContrasenia: "MiPassword123",
	// 		Telefono: "5512345678",
	// 		Consentimiento: true,
	// 	};

	// 	// Act: Ejecutar la validación
	// 	const resultado = registerSchema.safeParse(datosInvalidos);

	// 	// Assert: Verificar que la validación falló
	// 	expect(resultado.success).toBe(false);
	// 	if (!resultado.success) {
	// 		expect(resultado.error.issues[0].path).toContain("Correo");
	// 		expect(resultado.error.issues[0].message).toBe(
	// 			"El correo no tiene un formato válido"
	// 		);
	// 	}
	// });

	it("debería fallar cuando las contraseñas no coinciden", () => {
		// Arrange: Preparar datos con contraseñas diferentes
		const datosInvalidos = {
			Nombre: "Juan",
			Apellido_Paterno: "Pérez",
			Apellido_Materno: "García",
			Correo: "juan.perez@ejemplo.com",
			Contrasenia: "MiPassword123",
			ConfirmarContrasenia: "OtraPassword456",
			Telefono: "5512345678",
			Consentimiento: true,
		};

		// Act: Ejecutar la validación
		const resultado = registerSchema.safeParse(datosInvalidos);

		// Assert: Verificar que la validación falló por contraseñas no coincidentes
		expect(resultado.success).toBe(false);
		if (!resultado.success) {
			const error = resultado.error.issues.find(
				(issue) => issue.path[0] === "ConfirmarContrasenia"
			);
			expect(error?.message).toBe("Las contraseñas no coinciden");
		}
	});
});
