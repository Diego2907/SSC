import { Router } from "express";
import * as authController from "./controllers/auth.controller.js";
import {
	validateRegister,
	validateLogin,
} from "./validators/auth.validation.js";
import { authenticate } from "./middleware/auth.middleware.js";

const router = Router();

// Ruta para registrar un nuevo usuario (Cliente)
router.post("/register", validateRegister, authController.register);

// Ruta para iniciar sesión (Cliente)
router.post("/login", validateLogin, authController.login);

// Ruta para obtener el perfil del usuario autenticado (requiere JWT)
router.get("/profile", authenticate, authController.getProfile);

// Login Social: Google (Puede ser usado por ambos roles si se ajusta el controlador)
router.post("/google", authController.loginGoogle);

// Login Social: Facebook
router.post("/facebook", authController.loginFacebook);

export default router;
