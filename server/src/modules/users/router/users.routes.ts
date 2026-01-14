import { Router } from "express";
import domicilioRoutes from "./domicilio.route.js";

const router = Router();
router.use("/domicilio", domicilioRoutes);

export default router;
