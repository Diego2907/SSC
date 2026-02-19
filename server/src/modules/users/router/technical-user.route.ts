import { Router } from "express";
import * as techUserController from "../controllers/technical-user.controller.js";
import { authenticate } from "../../auth/middleware/auth.middleware.js";

const router = Router();

//? Middleware de autenticación global para estas rutas
router.use(authenticate);

//? Rutas de Perfil Técnico
router.get("/profile", techUserController.getProfile);
router.patch("/profile", techUserController.updateProfile);

//? Configuración Operativa (Monitoreo/Vacaciones)
router.patch("/monitoring", techUserController.updateMonitoring);

//? Seguridad
router.patch("/security", techUserController.updateSecurity);
router.post("/validate-password", techUserController.validatePassword);

export default router;
