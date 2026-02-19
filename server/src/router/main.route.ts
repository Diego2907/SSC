//? librerias externas
import { Router } from "express";
import authroutes from "../modules/auth/auth.route.js";
import usuarioRoutes from "../modules/users/router/users.routes.js";
import technicianRoutes from "../modules/users/router/technician.routes.js";

//? rutas
const router = Router();

router.use("/auth", authroutes);
router.use("/usuario", usuarioRoutes);
router.use("/technician", technicianRoutes);

export default router;
