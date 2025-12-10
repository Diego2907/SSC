//? librerias externas
import { Router } from "express";
import { Usuario } from "../modules/auth/repositories/auth.repository.js"; //! Eliminar cuando se cree el modulo de usuarios
import authroutes from "../modules/auth/auth.route.js";

//? rutas
const router = Router();

router.use("/auth", authroutes);
router.get("/usuarios", async (_req, res) => {
	try {
		const usuarios = await Usuario.findAll();
		res.status(200).json({
			message: "Lista de usuarios",
			data: usuarios,
		});
	} catch (error: any) {
		console.error("Error completo:", error);
		res.status(500).json({
			message: "Error al obtener usuarios",
			error: error.message,
		});
	}
});

export default router;
