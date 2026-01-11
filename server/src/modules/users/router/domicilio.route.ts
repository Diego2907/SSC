import { Router } from "express";
import * as domicilioController from "../controllers/domicilio.controller.js";
import {
	validarAgregarDomicilio,
	validarActualizarDomicilio,
} from "../validators/domicilio.validation.js";
import { authenticate } from "../../auth/middleware/auth.middleware.js";
import { completarDomicilio } from "../controllers/codigosPostales.controller.js";

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

//? RUTAS EXPERIMENTALES
//! REVISAR CON EL EQUIPO SI SE PONE AQUI O SE HACE SU PROPIO ROUTER
router.get("/buscar-datos/:codigoPostal", completarDomicilio);

export default router;
