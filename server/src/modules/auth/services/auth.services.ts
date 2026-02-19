import { Usuario } from "../repositories/auth.repository.js";
import { TechnicalUser } from "../../users/repositories/technical-user.repository.js";
import jwt, { type SignOptions } from "jsonwebtoken";
import env from "../../../config/env.config.js";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
// import axios from "axios"; // Para Facebook (pendiente de implementación real si no se usa)

const { JWT_SECRET, JWT_EXPIRES_IN, GOOGLE_CLIENT_ID } = env;

// Cliente de Google
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

//? Interface para el payload del JWT
interface JWTPayload {
	id_Usuario?: string; // Para usuarios (legacy)
	Correo?: string;    // Para usuarios (legacy)
    id?: number;        // Para técnicos
	email?: string;     // Para técnicos
	role?: "client" | "technical";
}

//? Interface para los datos de registro de usuario
interface RegisterData {
	Nombre: string;
	Apellido_Paterno: string;
	Apellido_Materno: string;
	Correo: string;
	Contrasenia: string;
	Telefono: string;
	Consentimiento: boolean;
}

//? Interface para los datos de login de usuario
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
	provider?: "local" | "google" | "facebook";
}

//? Servicio para registrar un nuevo usuario (Cliente)
const registerUser = async (userData: RegisterData) => {
	const correoExistente = await Usuario.findOne({
		where: { Correo: userData.Correo },
	});

	if (correoExistente) {
		throw new Error("El correo ya está registrado");
	}

	const telefonoExistente = await Usuario.findOne({
		where: { Telefono: userData.Telefono },
	});

	if (telefonoExistente) {
		throw new Error("El teléfono ya está registrado");
	}

	const newUser = await Usuario.create({
		Nombre: userData.Nombre,
		Apellido_Paterno: userData.Apellido_Paterno,
		Apellido_Materno: userData.Apellido_Materno,
		Correo: userData.Correo,
		Contrasenia: userData.Contrasenia,
		Telefono: userData.Telefono,
		Consentimiento: userData.Consentimiento,
	});

	return newUser;
};

//? ============================================================================
//? NUEVO: Servicio para registrar un Usuario Técnico
//? ============================================================================
const registerTechnical = async (data: RegisterTechnicalData) => {
	//? 1. Verificación de Duplicados (Email)
	const existingEmail = await TechnicalUser.findOne({
		where: { email: data.email },
	});

	if (existingEmail) {
		throw new Error("El correo ya está registrado");
	}

	//? 2. Persistencia (Guardar en BD)
    // Asignamos provider local por defecto si no viene
    const technicalData = {
        ...data,
        provider: data.provider || "local",
        is_active: true // Por defecto activo al registrarse (o false si requiere aprobación)
    };
    
	const newTechnicalUser = await TechnicalUser.create(technicalData as any);

	//? 3. Retorno Seguro
	return {
		id: newTechnicalUser.getDataValue("id"),
		nombre: newTechnicalUser.getDataValue("nombre"),
		email: newTechnicalUser.getDataValue("email"),
		is_active: newTechnicalUser.getDataValue("is_active"),
	};
};

//? Servicio para autenticar un usuario (Cliente)
const loginUser = async (loginData: LoginData) => {
	const usuario = await Usuario.findOne({
		where: { Correo: loginData.Correo },
	});

	if (!usuario) {
		throw new Error("Credenciales inválidas");
	}

	const isPasswordValid = await bcrypt.compare(
		loginData.Contrasenia,
		usuario.getDataValue("Contrasenia"),
	);

	if (!isPasswordValid) {
		throw new Error("Credenciales inválidas");
	}

	const token = jwt.sign(
		{
			id_Usuario: usuario.getDataValue("id_Usuario"),
			Correo: usuario.getDataValue("Correo"),
            role: "client"
		} as JWTPayload,
		JWT_SECRET,
		{ expiresIn: JWT_EXPIRES_IN } as SignOptions,
	);

	return { token };
};

//? ============================================================================
//? NUEVO: Servicio para autenticar un Técnico (Login Tradicional)
//? ============================================================================
const loginTechnicalUser = async (loginData: {
	email: string;
	password: string;
}) => {
	// 1. Buscar técnico por email
	const tecnico = await TechnicalUser.findOne({
		where: { email: loginData.email },
	});

	if (!tecnico) {
		throw new Error("Credenciales inválidas");
	}

	// 2. Verificar Proveedor
	const provider = tecnico.getDataValue("provider");
	if (provider !== "local") {
		throw new Error(`Debes iniciar sesión con ${provider}`);
	}

	// 3. Verificar Contraseña
	const storedPassword = tecnico.getDataValue("password");
	if (!storedPassword) {
		throw new Error("Error en la cuenta. Contacte soporte.");
	}

	const isPasswordValid = await bcrypt.compare(
		loginData.password,
		storedPassword,
	);

	if (!isPasswordValid) {
		throw new Error("Credenciales inválidas");
	}

	// 4. Verificar si está activo
	if (!tecnico.getDataValue("is_active")) {
		throw new Error("La cuenta ha sido desactivada");
	}

	// 5. Generar Token JWT
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

//? ============================================================================
//? NUEVO: Helper para Buscar o Crear Usuario Social
//? ============================================================================
const findOrCreateSocialUser = async (
	email: string,
	nombre: string,
	apellido: string,
	provider: "google" | "facebook",
) => {
	// 1. Buscar si ya existe
	let tecnico = await TechnicalUser.findOne({ where: { email } });

	if (tecnico) {
		// Validar que el proveedor coincida
		if (tecnico.getDataValue("provider") !== provider) {
			throw new Error(
				`El correo ya está registrado usando ${tecnico.getDataValue("provider")}`,
			);
		}
	} else {
		// 2. Si no existe, CREAR
		tecnico = await TechnicalUser.create({
			email,
			nombre,
			apellido_paterno: apellido,
			apellido_materno: "",
			telefono: "0000000000",
			provider,
			terms_accepted: true,
			is_active: true,
            // Password aleatorio o null para usuarios sociales
            password: await bcrypt.hash(Math.random().toString(36), 10) 
		} as any);
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

//? ============================================================================
//? NUEVO: Login con Google
//? ============================================================================
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

//? ============================================================================
//? NUEVO: Login con Facebook (Placeholder - requiere axios e implementación real)
//? ============================================================================
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loginWithFacebook = async (accessToken: string) => {
 
	try {
        /*
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
        */
        throw new Error("Login con Facebook no implementado aún");
	} catch (error: any) {
		console.error("Error en loginWithFacebook:", error);
		throw new Error("Error al validar con Facebook");
	}
};

//? Servicio para verificar un token JWT
const verifyToken = (token: string): JWTPayload => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
		return decoded;
	} catch (error) {
		throw new Error("Token inválido o expirado", error as any);
	}
};

//? Servicio para obtener usuario por ID (Cliente)
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
	registerTechnical,
	loginUser,
	loginTechnicalUser,
	loginWithGoogle,
	loginWithFacebook,
	verifyToken,
	getUserById,
};