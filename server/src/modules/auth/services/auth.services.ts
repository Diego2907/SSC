import { Usuario } from "../repositories/auth.repository.js";
import { TechnicalUser } from "../../users/repositories/technical-user.repository.js"; // Importamos el nuevo repo
import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import env from "../../../config/env.config.js";
import { OAuth2Client } from "google-auth-library"; // Librería de Google
import axios from "axios"; // Para Facebook

const { JWT_SECRET, JWT_EXPIRES_IN, GOOGLE_CLIENT_ID } = env;

// Cliente de Google
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

//? Interfaz para el payload del token
interface JWTPayload {
	id_Usuario?: string; // Para usuarios normales
	id?: number; // Para usuarios técnicos
	Correo?: string;
	email?: string;
	role: "client" | "technical"; // Rol estricto
}

interface LoginData {
	Correo: string;
	Contrasenia: string;
}

//? Interfaz de datos para registro técnico
interface RegisterTechnicalData {
	nombre: string;
	apellido_paterno: string;
	apellido_materno: string;
	email: string;
	telefono: string;
	password: string;
	terms_accepted: boolean;
	provider?: "local" | "google" | "facebook"; // Opcional, por defecto es local
}

//? Servicio para registrar un nuevo usuario (Cliente normal)
const registerUser = async (userData: any) => {
	// Buscar el usuario por correo
	const existingUserByEmail = await Usuario.findOne({
		where: { Correo: userData.Correo },
	});

	if (existingUserByEmail) {
		throw new Error("El correo ya está registrado");
	}

	// Buscar el usuario por teléfono
	const existingUserByPhone = await Usuario.findOne({
		where: { Telefono: userData.Telefono },
	});

	if (existingUserByPhone) {
		throw new Error("El teléfono ya está registrado");
	}

	// Crear el usuario
	const newUser = await Usuario.create(userData);

	return newUser;
};

//? ============================================================================
//? NUEVO: Servicio para registrar un Usuario Técnico
//? ============================================================================
/*
const registerTechnical = async (data: RegisterTechnicalData) => {
	//? 1. Verificación de Duplicados (Email)
	const existingEmail = await TechnicalUser.findOne({
		where: { email: data.email },
	});

	if (existingEmail) {
		throw new Error("El correo ya está registrado");
	}

	//? 2. Persistencia (Guardar en BD)
	const newTechnicalUser = await TechnicalUser.create(data as any);

	//? 3. Retorno Seguro
	return {
		id: newTechnicalUser.getDataValue("id"),
		nombre: newTechnicalUser.getDataValue("nombre"),
		email: newTechnicalUser.getDataValue("email"),
		is_active: newTechnicalUser.getDataValue("is_active"),
	};
};
*/

//? Servicio para autenticar un usuario
const loginUser = async (loginData: LoginData) => {
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
		usuario.getDataValue("Contrasenia"),
	);

	if (!isPasswordValid) {
		throw new Error("Credenciales inválidas");
	}

	// Generar token JWT
	const token = jwt.sign(
		{
			id_Usuario: usuario.getDataValue("id_Usuario"),
			Correo: usuario.getDataValue("Correo"),
			// role: "client", // Agregamos rol implícito
		} as JWTPayload,
		JWT_SECRET,
		{ expiresIn: JWT_EXPIRES_IN } as SignOptions,
	);

	return { token };
};

//? ============================================================================
//? NUEVO: Servicio para autenticar un Técnico (Login Tradicional)
//? ============================================================================
/*
const loginTechnicalUser = async (loginData: {
	email: string;
	password: string;
}) => {
	// 1. Buscar técnico por email
	const tecnico = await TechnicalUser.findOne({
		where: { email: loginData.email },
	});

	if (!tecnico) {
		throw new Error("Credenciales inválidas"); // No decimos "usuario no existe" por seguridad
	}

	// 2. Verificar Proveedor (Evitar login local si es cuenta de Google)
	const provider = tecnico.getDataValue("provider");
	if (provider !== "local") {
		throw new Error(`Debes iniciar sesión con ${provider}`);
	}

	// 3. Verificar Contraseña
	const storedPassword = tecnico.getDataValue("password");
	if (!storedPassword) {
		throw new Error("Error en la cuenta. Contacte soporte."); // Caso raro: local sin pass
	}

	const isPasswordValid = await bcrypt.compare(
		loginData.password,
		storedPassword,
	);

	if (!isPasswordValid) {
		throw new Error("Credenciales inválidas");
	}

	// 4. Verificar si está activo (Regla de negocio adicional)
	if (!tecnico.getDataValue("is_active")) {
		throw new Error("La cuenta ha sido desactivada");
	}

	// 5. Generar Token JWT con rol 'technical'
	const token = jwt.sign(
		{
			id: tecnico.getDataValue("id"),
			email: tecnico.getDataValue("email"),
			role: "technical", // Rol CRÍTICO para middleware de autorización
		} as JWTPayload,
		JWT_SECRET,
		{ expiresIn: JWT_EXPIRES_IN } as SignOptions,
	);

	return {
		token,
		user: {
			id: tecnico.getDataValue("id"),
			nombre: tecnico.getDataValue("nombre"),
			email: tecnico.getDataValue("email"),
			role: "technical",
		},
	};
};
*/

//? ============================================================================
//? NUEVO: Helper para Buscar o Crear Usuario Social
//? ============================================================================
/*
const findOrCreateSocialUser = async (
	email: string,
	nombre: string,
	apellido: string,
	provider: "google" | "facebook",
) => {
	// 1. Buscar si ya existe
	let tecnico = await TechnicalUser.findOne({ where: { email } });

	if (tecnico) {
		// Validar que el proveedor coincida (Seguridad: Evitar secuestro de cuentas)
		if (tecnico.getDataValue("provider") !== provider) {
			throw new Error(
				`El correo ya está registrado usando ${tecnico.getDataValue("provider")}`,
			);
		}
	} else {
		// 2. Si no existe, CREAR (Auto-registro)
		// Nota: Como Google/Facebook a veces no dan teléfono, ponemos uno dummy o null si la BD lo permite.
		// En nuestro modelo 'telefono' es obligatorio (Requisito previo).
		// SOLUCIÓN: Usaremos "0000000000" temporalmente y el frontend deberá pedir actualizar perfil.
		tecnico = await TechnicalUser.create({
			email,
			nombre,
			apellido_paterno: apellido,
			apellido_materno: "", // A veces no viene, lo dejamos vacío
			telefono: "0000000000", // Placeholder obligatorio
			provider,
			terms_accepted: true, // Implícito al usar social login
			is_active: true,
		});
	}

	// 3. Generar JWT
	const token = jwt.sign(
		{
			id: tecnico.getDataValue("id"),
			email: tecnico.getDataValue("email"),
			role: "technical",
		} as JWTPayload,
		JWT_SECRET,
		{ expiresIn: JWT_EXPIRES_IN } as SignOptions,
	);

	return {
		token,
		user: {
			id: tecnico.getDataValue("id"),
			nombre: tecnico.getDataValue("nombre"),
			email: tecnico.getDataValue("email"),
			role: "technical",
		},
	};
};
*/

//? ============================================================================
//? NUEVO: Login con Google
//? ============================================================================
/*
const loginWithGoogle = async (idToken: string) => {
	try {
		const ticket = await googleClient.verifyIdToken({
			idToken,
			audience: GOOGLE_CLIENT_ID,
		});
		const payload = ticket.getPayload();

		if (!payload || !payload.email) {
			throw new Error("Token de Google inválido");
		}

		return await findOrCreateSocialUser(
			payload.email,
			payload.given_name || "Usuario",
			payload.family_name || "",
			"google",
		);
	} catch (error) {
		console.error("Error en loginWithGoogle:", error);
		throw new Error("Error al validar con Google");
	}
};
*/

//? ============================================================================
//? NUEVO: Login con Facebook
//? ============================================================================
/*
const loginWithFacebook = async (accessToken: string) => {
	try {
		// Validar token contra Graph API
		const { data } = await axios.get(
			`https://graph.facebook.com/me?fields=id,name,email,first_name,last_name&access_token=${accessToken}`,
		);

		if (!data.email) {
			throw new Error("Facebook no proporcionó el correo electrónico");
		}

		return await findOrCreateSocialUser(
			data.email,
			data.first_name || "Usuario",
			data.last_name || "",
			"facebook",
		);
	} catch (error) {
		console.error("Error en loginWithFacebook:", error);
		throw new Error("Error al validar con Facebook");
	}
};
*/

//? Servicio para verificar un token JWT
const verifyToken = (token: string) => {
	try {
		return jwt.verify(token, JWT_SECRET) as JWTPayload;
	} catch (error) {
		console.error("Error verificando token:", error);
		throw new Error("Token inválido o expirado");
	}
};

//! Servicio para obtener usuario por ID
const getUserById = async (id_Usuario: string) => {
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

export {
	registerUser,
	// registerTechnical,
	loginUser,
	// loginTechnicalUser,
	// loginWithGoogle, // Exportar
	// loginWithFacebook, // Exportar
	verifyToken,
	getUserById,
};
