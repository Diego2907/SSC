import { Router } from "express";
import * as authController from "../../auth/controllers/auth.controller.js";
import * as technicalUserController from "../controllers/technical-user.controller.js";
import { authenticate } from "../../auth/middleware/auth.middleware.js";
import { uploadProfileImage } from "../middleware/upload.middleware.js";
import {
	validateRegisterTechnical,
	validateSchema,
	validateChangePassword,
} from "../../auth/validators/auth.validation.js";
import { z } from "zod";

const router = Router();

//? Esquema rápido para Login Técnico (email, password)
const loginTechnicalSchema = z.object({
	email: z.string().email("Formato de correo inválido"),
	password: z.string().min(1, "La contraseña es obligatoria"),
});
const validateLoginTechnical = validateSchema(loginTechnicalSchema);

//? ============================================================================
//? RUTAS DE AUTENTICACIÓN (TÉCNICOS)
//? ============================================================================

// Registro de Técnico
router.post(
	"/register",
	validateRegisterTechnical,
	authController.registerTechnical,
);

// Login de Técnico
router.post(
	"/login",
	validateLoginTechnical,
	authController.loginTechnical,
);

// Cerrar Sesión
router.post("/logout", authController.logout);

//? ============================================================================
//? RUTAS DE PERFIL Y CONFIGURACIÓN (PROTEGIDAS)
//? ============================================================================

// Obtener Perfil
router.get("/profile", authenticate, technicalUserController.getProfile);

// Actualizar Perfil (Datos y Configuración Operativa)
router.patch("/profile", authenticate, technicalUserController.updateProfile);

// Subir Imagen de Perfil
router.post(
	"/profile/avatar",
	authenticate,
	uploadProfileImage.single("avatar"),
	technicalUserController.uploadAvatar,
);

// Cambiar Contraseña (Con validación robusta)
router.post(
	"/change-password",
	authenticate,
	validateChangePassword,
	technicalUserController.changePassword,
);

//? Configuración de Seguridad (2FA, Email Secundario, etc.)
//? Aunque updateProfile podría manejarlo, un endpoint dedicado es más limpio para acciones específicas
router.patch(
	"/security",
	authenticate,
	technicalUserController.updateSecurity,
);

export default router;
