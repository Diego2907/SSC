import { Router } from "express";
import * as authController from "./controllers/auth.controller.js";
import {
	validateRegister,
	validateLogin,
	validateRegisterTechnical, // Importamos validador de registro
} from "./validators/auth.validation.js";
import { authenticate } from "./middleware/auth.middleware.js";

// TODO: Crear validador específico para login técnico (email, password)
// Por ahora reutilizamos validateLogin si los campos coinciden o creamos uno rápido.
// Como el login de cliente usa 'Correo' y 'Contrasenia' (Capitalizados) y Técnico usa 'email' y 'password',
// necesitamos un validador nuevo o ajustar el existente.
import { z } from "zod";
import { validateSchema } from "./validators/auth.validation.js";

// Esquema rápido para Login Técnico (email, password)
const loginTechnicalSchema = z.object({
	email: z.string().email("Formato de correo inválido"),
	password: z.string().min(1, "La contraseña es obligatoria"),
});
const validateLoginTechnical = validateSchema(loginTechnicalSchema);

const router = Router();

// Ruta para registrar un nuevo usuario (Cliente)
router.post("/register", validateRegister, authController.register);

//? ============================================================================
//? RUTAS DE TÉCNICOS
//? ============================================================================

// Registro de Técnico
router.post(
	"/register-technical",
	validateRegisterTechnical,
	authController.registerTechnical,
);

// Login de Técnico (Tradicional)
router.post(
	"/login-technical",
	validateLoginTechnical, // Validador inline Zod
	authController.loginTechnical,
);

// Login Social: Google
router.post("/google", authController.loginGoogle);

// Login Social: Facebook
router.post("/facebook", authController.loginFacebook);

//? ============================================================================

// Ruta para iniciar sesión (Cliente)
router.post("/login", validateLogin, authController.login);

//!Esta ruta no va en este modulo
// Ruta para obtener el perfil del usuario autenticado (requiere JWT)
router.get("/profile", authenticate, authController.getProfile);

export default router;
