/**
 * Script para probar los endpoints de la API
 * Ejecuta pruebas básicas de los endpoints principales
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const BASE_URL = `http://localhost:${process.env.PORT || 3000}`;

// Colores para la consola
const colors = {
	reset: '\x1b[0m',
	green: '\x1b[32m',
	red: '\x1b[31m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
	console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(method, endpoint, data = null, token = null) {
	const options = {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	if (token) {
		options.headers['Cookie'] = `token=${token}`;
	}

	if (data) {
		options.body = JSON.stringify(data);
	}

	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, options);
		let responseData;
		
		// Intentar parsear JSON, si falla usar texto
		try {
			const text = await response.text();
			responseData = text ? JSON.parse(text) : {};
		} catch (parseError) {
			responseData = { message: 'Respuesta no es JSON válido' };
		}

		return {
			status: response.status,
			ok: response.ok,
			data: responseData,
		};
	} catch (error) {
		return {
			status: 0,
			ok: false,
			error: error.message,
		};
	}
}

async function runTests() {
	log('\n🧪 Probando Endpoints de la API\n', 'cyan');
	log('='.repeat(60), 'cyan');
	log('');

	// Test 1: Verificar que el servidor está corriendo
	log('1️⃣ Verificando que el servidor está corriendo...', 'blue');
	const serverTest = await testEndpoint('GET', '/');
	if (serverTest.ok || serverTest.status === 200) {
		log('   ✅ Servidor respondiendo correctamente\n', 'green');
	} else {
		if (serverTest.error) {
			log(`   ❌ Error de conexión: ${serverTest.error}`, 'red');
		} else {
			log(`   ⚠️  Status: ${serverTest.status}`, 'yellow');
		}
		log(`   🔍 Intentando conectar a: ${BASE_URL}/`, 'cyan');
		log('   💡 Asegúrate de que el servidor esté corriendo: npm run dev\n', 'yellow');
		// Continuar de todas formas para ver qué otros errores hay
	}

	// Test 2: Registrar un nuevo usuario
	log('2️⃣ Probando registro de usuario (POST /api/auth/register)...', 'blue');
	const timestamp = Date.now();
	const randomNum = Math.floor(Math.random() * 10000);
	const registerData = {
		Nombre: 'Juan',
		Apellido_Paterno: 'Pérez',
		Apellido_Materno: 'García',
		Correo: `test${timestamp}${randomNum}@ejemplo.com`, // Email único
		Contrasenia: 'MiContraseña123',
		ConfirmarContrasenia: 'MiContraseña123',
		Telefono: `55${timestamp.toString().slice(-8)}`, // Teléfono único (últimos 8 dígitos del timestamp)
		Consentimiento: true,
	};

	const registerResult = await testEndpoint('POST', '/api/auth/register', registerData);
	if (registerResult.ok && registerResult.status === 201) {
		log('   ✅ Usuario registrado exitosamente', 'green');
		log(`   📧 Email: ${registerData.Correo}`, 'cyan');
		log(`   📱 Teléfono: ${registerData.Telefono}\n`, 'cyan');
	} else {
		log('   ❌ Error al registrar usuario', 'red');
		log(`   Status: ${registerResult.status}`, 'yellow');
		log(`   Error: ${JSON.stringify(registerResult.data, null, 2)}\n`, 'yellow');
	}

	// Test 3: Intentar registrar el mismo usuario (debe fallar)
	log('3️⃣ Probando registro duplicado (debe fallar)...', 'blue');
	const duplicateResult = await testEndpoint('POST', '/api/auth/register', registerData);
	if (!duplicateResult.ok && (duplicateResult.status === 400 || duplicateResult.status === 409)) {
		log('   ✅ Validación funcionando: usuario duplicado detectado\n', 'green');
		log(`   📋 Mensaje: ${duplicateResult.data?.message || 'Usuario duplicado'}\n`, 'cyan');
	} else {
		log('   ⚠️  La validación de duplicados podría no estar funcionando\n', 'yellow');
		log(`   Status recibido: ${duplicateResult.status}\n`, 'yellow');
	}

	// Test 4: Login con credenciales correctas
	log('4️⃣ Probando inicio de sesión (POST /api/auth/login)...', 'blue');
	const loginData = {
		Correo: registerData.Correo,
		Contrasenia: registerData.Contrasenia,
	};

	const loginResult = await testEndpoint('POST', '/api/auth/login', loginData);
	let token = null;
	if (loginResult.ok && loginResult.status === 200) {
		log('   ✅ Login exitoso', 'green');
		// El token puede estar en data.token o data.data.token
		token = loginResult.data?.token || loginResult.data?.data?.token || null;
		if (token) {
			log(`   🔑 Token recibido: ${token.substring(0, 20)}...\n`, 'cyan');
		} else {
			log(`   ⚠️  Token no encontrado en la respuesta\n`, 'yellow');
			log(`   📋 Respuesta completa: ${JSON.stringify(loginResult.data, null, 2)}\n`, 'cyan');
		}
	} else {
		log('   ❌ Error al hacer login', 'red');
		log(`   Status: ${loginResult.status}`, 'yellow');
		log(`   Error: ${JSON.stringify(loginResult.data, null, 2)}\n`, 'yellow');
	}

	// Test 5: Login con credenciales incorrectas
	log('5️⃣ Probando login con contraseña incorrecta (debe fallar)...', 'blue');
	const wrongLogin = await testEndpoint('POST', '/api/auth/login', {
		Correo: registerData.Correo,
		Contrasenia: 'ContraseñaIncorrecta',
	});
	if (!wrongLogin.ok && wrongLogin.status === 401) {
		log('   ✅ Validación funcionando: credenciales incorrectas detectadas\n', 'green');
	} else {
		log('   ⚠️  La validación de credenciales podría no estar funcionando\n', 'yellow');
	}

	// Test 6: Obtener perfil (requiere autenticación)
	if (token) {
		log('6️⃣ Probando obtener perfil (GET /api/auth/profile)...', 'blue');
		const profileResult = await testEndpoint('GET', '/api/auth/profile', null, token);
		if (profileResult.ok && profileResult.status === 200) {
			log('   ✅ Perfil obtenido exitosamente', 'green');
			const userData = profileResult.data.data || profileResult.data.user || profileResult.data;
			if (userData && userData.Nombre) {
				log(`   👤 Usuario: ${userData.Nombre} ${userData.Apellido_Paterno} ${userData.Apellido_Materno}`, 'cyan');
				log(`   📧 Email: ${userData.Correo}`, 'cyan');
				log(`   📱 Teléfono: ${userData.Telefono}\n`, 'cyan');
			} else {
				log(`   📋 Respuesta: ${JSON.stringify(profileResult.data, null, 2)}\n`, 'cyan');
			}
		} else {
			log('   ❌ Error al obtener perfil', 'red');
			log(`   Status: ${profileResult.status}`, 'yellow');
			log(`   Error: ${JSON.stringify(profileResult.data, null, 2)}\n`, 'yellow');
		}
	} else {
		log('6️⃣ Omitido: No hay token para probar el perfil\n', 'yellow');
	}

	// Resumen
	log('='.repeat(60), 'cyan');
	log('\n📊 Resumen de Pruebas\n', 'cyan');
	log('✅ Pruebas completadas', 'green');
	log('\n💡 Para más pruebas, usa:', 'yellow');
	log('   - Postman: Importa los endpoints desde el README', 'cyan');
	log('   - curl: Usa los ejemplos del README.md', 'cyan');
	log('   - Navegador: Abre la consola y usa fetch()\n', 'cyan');
}

// Verificar si fetch está disponible (Node.js 18+)
if (typeof fetch === 'undefined') {
	console.error('❌ Este script requiere Node.js 18+ o instalar node-fetch');
	console.error('   Ejecuta: npm install node-fetch\n');
	process.exit(1);
}

runTests().catch((error) => {
	console.error('❌ Error al ejecutar pruebas:', error);
	process.exit(1);
});
