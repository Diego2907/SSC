import { Usuario } from "../repositories/auth.repository.js";
import jwt, { type SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Obtener el secreto JWT del entorno
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

//? Interface para el payload del JWT
interface JWTPayload {
	id_Usuario: string;
	Correo: string;
}

//? Interface para los datos de registro
interface RegisterData {
	Nombre: string;
	Apellido_Paterno: string;
	Apellido_Materno: string;
	Correo: string;
	Contrasenia: string;
	Telefono: string;
	Consentimiento?: Date;
}

//? Interface para los datos de login
interface LoginData {
	Correo: string;
	Contrasenia: string;
}

//? Servicio para registrar un nuevo usuario
export const registerUser = async (userData: RegisterData) => {
	// Sincronizar la tabla de usuarios
	await Usuario.sync();

	// Verificar si el correo ya existe
	const correoExistente = await Usuario.findOne({
		where: { Correo: userData.Correo },
	});

	if (correoExistente) {
		throw new Error("El correo ya está registrado");
	}

	// Verificar si el teléfono ya existe
	const telefonoExistente = await Usuario.findOne({
		where: { Telefono: userData.Telefono },
	});

	if (telefonoExistente) {
		throw new Error("El teléfono ya está registrado");
	}

	//? (UUID y hash de contraseña se manejan automáticamente en el repository)
	await Usuario.create({
		Nombre: userData.Nombre,
		Apellido_Paterno: userData.Apellido_Paterno,
		Apellido_Materno: userData.Apellido_Materno,
		Correo: userData.Correo,
		Contrasenia: userData.Contrasenia,
		Telefono: userData.Telefono,
		Consentimiento: userData.Consentimiento,
	});

	return { status: "success" };
};

//? Servicio para autenticar un usuario
export const loginUser = async (loginData: LoginData) => {
	// Buscar el usuario por correo
	const usuario = await Usuario.findOne({
		where: { Correo: loginData.Correo },
	});

	if (!usuario) {
		throw new Error("Credenciales inválidas");
	}

	// Verificar la contraseña
	const isPasswordValid = await bcrypt.compare(
		loginData.Contrasenia,
		usuario.getDataValue("Contrasenia")
	);

	if (!isPasswordValid) {
		throw new Error("Credenciales inválidas");
	}

	// Generar token JWT
	const token = jwt.sign(
		{
			id_Usuario: usuario.getDataValue("id_Usuario"),
			Correo: usuario.getDataValue("Correo"),
		} as JWTPayload,
		JWT_SECRET,
		{ expiresIn: JWT_EXPIRES_IN } as SignOptions
	);

	return { token };
};

// Servicio para verificar un token JWT
export const verifyToken = (token: string): JWTPayload => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
		return decoded;
	} catch (error) {
		throw new Error("Token inválido o expirado");
	}
};

//! ESTE SERVICIO NO SE ESTA USANDO POR EL MOMENTO
// Servicio para obtener usuario por ID
export const getUserById = async (id_Usuario: string) => {
	const user = await Usuario.findByPk(id_Usuario);

	if (!user) {
		throw new Error("Usuario no encontrado");
	}

	return {
		Nombre: user.getDataValue("Nombre"),
		Apellido_Paterno: user.getDataValue("Apellido_Paterno"),
		Apellido_Materno: user.getDataValue("Apellido_Materno"),
		Correo: user.getDataValue("Correo"),
		Telefono: user.getDataValue("Telefono"),
	};
};
