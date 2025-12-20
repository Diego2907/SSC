/**
 * ? agregar, actualizar, eliminar,
 * ? ver todos, ver uno domicilios de usuario
 */
import { Router } from "express";
import * as domicilioController from "../controllers/domicilio.controller.js";
import {
	validarAgregarDomicilio,
	validarActualizarDomicilio,
} from "../validators/domicilio.validation.js";
import { authenticate } from "../../auth/middleware/auth.middleware.js";
const router = Router();

router.post(
	"/agregar",
	authenticate,
	validarAgregarDomicilio,
	domicilioController.agregarDomicilio
);
router.put(
	"/actualizar",
	authenticate,
	validarActualizarDomicilio,
	domicilioController.actualizarDomicilio
);
router.delete(
	"/eliminar/:idDomicilio",
	authenticate,
	domicilioController.eliminarDomicilio
);
router.get("/verTodos", authenticate, domicilioController.verTodosDomicilios);
router.get("/:idDomicilio", authenticate, domicilioController.verDomicilio);

export default router;
