import { CodigoPostal } from "../repositories/codigoPostal.repository.js";

interface CodigoPostalInterface {
	id: number;
	estado: string;
	municipio: string;
	rango_Inicio: number;
	rango_Fin: number;
}

const codigoPostalValidado = async (
	municipio: string,
	cp: string
): Promise<boolean> => {
	const resultado = (await CodigoPostal.findOne({
		where: { municipio: municipio },
	})) as CodigoPostalInterface | null;

	if (!resultado) {
		return false;
	}
	if (
		parseInt(cp) < resultado.rango_Inicio ||
		parseInt(cp) > resultado.rango_Fin
	) {
		return false;
	}
	return true;
};

export { codigoPostalValidado };
