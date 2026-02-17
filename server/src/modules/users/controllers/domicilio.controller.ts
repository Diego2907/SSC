import type { Request, Response } from "express";
import * as domicilioService from "../services/domicilio.services.js";

//? Controlador para agregar un nuevo domicilio
const agregarDomicilio = async (req: Request, res: Response): Promise<void> => {
	try {
		const id_Usuario = (req as any).user?.id_Usuario;
		if (!id_Usuario) {
			res.status(401).json({ error: "Usuario no autenticado" });
			return;
		}
		const domicilioData = { ...req.body, id_Usuario };
		const result = await domicilioService.agregarDomicilio(domicilioData);
		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
};
//? Controlador para actualizar un domicilio
const actualizarDomicilio = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const domicilioData = req.body;
		const result = await domicilioService.actualizarDomicilio(domicilioData);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
};
//? Controlador para eliminar un domicilio
//TODO REVISARLO
const eliminarDomicilio = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const idDomicilio: any = req.params.idDomicilio;
		const result = await domicilioService.eliminarDomicilio(idDomicilio);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
};
//? Controlador para ver todos los domicilios de un usuario
const verTodosDomicilios = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const idUsuario = (req as any).user?.id_Usuario;
		if (!idUsuario) {
			res.status(401).json({ error: "Usuario no autenticado" });
			return;
		}
		const result = await domicilioService.verTodosDomicilios(idUsuario);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
};
//? Controlador para ver un domicilio
const verDomicilio = async (req: Request, res: Response): Promise<void> => {
	try {
		const idDomicilio: any = req.params.idDomicilio;
		const result = await domicilioService.verDomicilio(idDomicilio);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
};

export {
	agregarDomicilio,
	actualizarDomicilio,
	eliminarDomicilio,
	verTodosDomicilios,
	verDomicilio,
};
