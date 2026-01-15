import { Router } from "express";
import * as authController from "./controllers/auth.controller.js";
import {
	validateRegister,
	validateLogin,
} from "./validators/auth.validation.js";
import { authenticate } from "./middleware/auth.middleware.js";

const router = Router();

// Ruta para registrar un nuevo usuario
router.post("/register", validateRegister, authController.register);

// Ruta para iniciar sesión
router.post("/login", validateLogin, authController.login);

//!Esta ruta no va en este modulo
// Ruta para obtener el perfil del usuario autenticado (requiere JWT)
router.get("/profile", authenticate, authController.getProfile);

export default router;
