import type { Request, Response } from "express";
import { buscarDatosPorCodigoPostal } from "../services/external/dipomex.services.js";

const completarDomicilio = async (req: Request, res: Response) => {
	try {
		const { codigoPostal } = req.params;

		if (!codigoPostal) {
			res.status(400).json({ error: "El código postal es requerido" });
			return;
		}

		const datosDomicilio = await buscarDatosPorCodigoPostal(codigoPostal);

		res.status(200).json(datosDomicilio);
	} catch (error) {
		const mensaje =
			error instanceof Error
				? error.message
				: "Error al buscar el código postal";
		res.status(500).json({ error: mensaje });
	}
};

export { completarDomicilio };
