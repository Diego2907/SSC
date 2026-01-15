import { Domicilio } from "../repositories/usuario.repository.js";
import { Usuario } from "../../auth/repositories/auth.repository.js";

//? Interface para los datos de domicilio
interface DomicilioData {
	id_Usuario: string;
	codigo_Postal: string;
	estado: string;
	municipio: string;
	colonia: string;
	calle: string;
	numero_Exterior: string;
	numero_Interior?: string;
	referencias?: string;
	domicilio_Principal: boolean;
}
//? Verificar si el usuario existe
const usuarioExistente = async (id_Usuario: string) => {
	const usuario = await Usuario.findByPk(id_Usuario);
	if (!usuario) {
		throw new Error("El usuario no existe");
	}
	return true;
};

//? Servicio para agregar un nuevo domicilio
const agregarDomicilio = async (domicilioData: DomicilioData) => {
	await Domicilio.sync();
	await usuarioExistente(domicilioData.id_Usuario);

	await Domicilio.create({
		id_Usuario: domicilioData.id_Usuario,
		codigo_Postal: domicilioData.codigo_Postal,
		estado: domicilioData.estado,
		municipio: domicilioData.municipio,
		colonia: domicilioData.colonia,
		calle: domicilioData.calle,
		numero_Exterior: domicilioData.numero_Exterior,
		numero_Interior: domicilioData.numero_Interior,
		referencias: domicilioData.referencias,
		domicilio_Principal: domicilioData.domicilio_Principal,
	});

	return { message: "Domicilio agregado exitosamente" };
};
//? Servicio para actualizar un domicilio
const actualizarDomicilio = async (domicilioData: DomicilioData) => {
	await usuarioExistente(domicilioData.id_Usuario);
	await Domicilio.update(
		{
			referencias: domicilioData.referencias,
			domicilio_Principal: domicilioData.domicilio_Principal,
		},
		{ where: { id_Usuario: domicilioData.id_Usuario } }
	);
	return { message: "Domicilio actualizado exitosamente" };
};
//? Servicio para eliminar un domicilio
const eliminarDomicilio = async (idDomicilio: string) => {
	await Domicilio.destroy({ where: { id_Domicilio: idDomicilio } });
	return { message: "Domicilio eliminado exitosamente" };
};
//? Servicio para ver todos los domicilios de un usuario
const verTodosDomicilios = async (idUsuario: string) => {
	await usuarioExistente(idUsuario);
	const domicilios = await Domicilio.findAll({
		where: { id_Usuario: idUsuario },
	});
	return domicilios;
};
//? Servicio para ver un domicilio por su ID
const verDomicilio = async (idDomicilio: string) => {
	const domicilio = await Domicilio.findByPk(idDomicilio);
	return domicilio;
};

export {
	agregarDomicilio,
	actualizarDomicilio,
	eliminarDomicilio,
	verTodosDomicilios,
	verDomicilio,
};
