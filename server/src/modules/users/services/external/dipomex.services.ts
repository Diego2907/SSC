import env from "../../../../config/env.config.js";
import { codigoPostalValidado } from "../../validators/codigoPostal.validation.js";

const DIPOMEX_KEY = env.DIPOMEX_KEY;
const DIPOMEX_URL: string = `https://api.tau.com.mx/dipomex/v1/codigo_postal`;

interface DomicilioInfoInterface {
	codigoPostal: string;
	estado?: string;
	municipio?: string;
	colonias?: string[];
}

const buscarDatosPorCodigoPostal = async (
	codigoPostal: string,
): Promise<DomicilioInfoInterface> => {
	const response = await fetch(`${DIPOMEX_URL}?cp=${codigoPostal}`, {
		method: "GET",
		headers: {
			APIKEY: `${DIPOMEX_KEY}`,
		},
	});
	const data = await response.json();

	if (!response.ok || data.error) {
		throw new Error(data.message || "Error en la respuesta de la API");
	}

	const esValido = await codigoPostalValidado(
		data.codigo_postal.municipio,
		data.codigo_postal.codigo_postal,
	);

	if (!esValido) {
		throw new Error("El código postal no está en las zonas de cobertura");
	}

	return {
		estado: data.codigo_postal.estado,
		municipio: data.codigo_postal.municipio,
		codigoPostal: data.codigo_postal.codigo_postal,
		colonias: data.codigo_postal.colonias,
	};
};

export { buscarDatosPorCodigoPostal };
