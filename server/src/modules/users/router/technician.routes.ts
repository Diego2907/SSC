import { Router } from "express";
import * as authController from "../../auth/controllers/auth.controller.js";
import * as techUserController from "../controllers/technical-user.controller.js";
import { authenticate } from "../../auth/middleware/auth.middleware.js";

const router = Router();

//? Rutas Públicas
router.post("/register", authController.registerTechnical);
router.post("/login", authController.loginTechnical);

//? Rutas Privadas (Requieren Autenticación)
router.use(authenticate);

router.post("/logout", (req, res) => authController.logout(res));

import { uploadProfileImage } from "../middleware/upload.middleware.js";

//? Perfil y Configuración
router.get("/profile", techUserController.getProfile);
router.patch("/profile", techUserController.updateProfile); // Maneja perfil y settings
router.post(
	"/profile/avatar",
	uploadProfileImage.single("avatar"),
	techUserController.uploadAvatar,
);

//? Seguridad
router.post("/change-password", techUserController.changePassword);

export default router;
