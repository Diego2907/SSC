/**
 * Script para crear la base de datos si no existe
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: join(__dirname, '../.env') });

const config = {
	host: process.env.DB_USER_HOST || 'localhost',
	port: parseInt(process.env.DB_USER_PORT || '3306'),
	user: process.env.DB_USER_USER || 'root',
	password: process.env.DB_USER_PASSWORD || '',
	database: process.env.DB_USER_NAME || '',
};

async function createDatabase() {
	if (!config.database) {
		console.error('❌ Error: No se especificó nombre de base de datos en .env');
		console.error('   Configura DB_USER_NAME en el archivo server/.env\n');
		process.exit(1);
	}

	let connection;

	try {
		console.log('🔍 Conectando a MySQL...');
		// Conectar sin especificar base de datos
		connection = await mysql.createConnection({
			host: config.host,
			port: config.port,
			user: config.user,
			password: config.password,
		});

		console.log('✅ Conexión exitosa!\n');

		// Verificar si la base de datos ya existe
		const [databases] = await connection.execute(
			'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?',
			[config.database]
		);

		if (databases.length > 0) {
			console.log(`ℹ️  La base de datos "${config.database}" ya existe.\n`);
			await connection.end();
			process.exit(0);
		}

		// Crear la base de datos
		console.log(`📝 Creando base de datos "${config.database}"...`);
		await connection.execute(
			`CREATE DATABASE \`${config.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
		);
		console.log(`✅ Base de datos "${config.database}" creada exitosamente!\n`);

		// Verificar permisos del usuario
		console.log(`🔐 Verificando permisos para el usuario "${config.user}"...`);
		try {
			// Si es root, ya tiene todos los permisos
			if (config.user.toLowerCase() === 'root') {
				console.log(`✅ El usuario "root" ya tiene todos los permisos necesarios.\n`);
			} else {
				// Para otros usuarios, otorgar permisos
				await connection.execute(
					`GRANT ALL PRIVILEGES ON \`${config.database}\`.* TO '${config.user}'@'localhost'`
				);
				await connection.execute('FLUSH PRIVILEGES');
				console.log(`✅ Permisos otorgados correctamente!\n`);
			}
		} catch (grantError) {
			// Si el usuario no existe o hay problemas con permisos, solo mostrar advertencia
			if (grantError.code === 'ER_NONEXISTING_GRANT') {
				console.log(`⚠️  Nota: Si el usuario "${config.user}" no existe, créalo manualmente o usa 'root'.\n`);
			} else {
				console.log(`⚠️  No se pudieron otorgar permisos automáticamente: ${grantError.message}\n`);
				console.log(`ℹ️  Si usas "root", ya tienes todos los permisos necesarios.\n`);
			}
		}

		await connection.end();

		console.log('✅ ¡Base de datos lista para usar!\n');
		console.log('🚀 Ahora puedes iniciar el servidor con: npm run dev\n');
	} catch (error) {
		console.error('❌ Error al crear la base de datos:\n');

		if (error.code === 'ECONNREFUSED') {
			console.error('   El servidor MySQL no está corriendo.');
			console.error('   Inicia el servicio MySQL e intenta de nuevo.\n');
		} else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
			console.error('   Credenciales incorrectas (usuario o contraseña).');
			console.error('   Verifica las credenciales en el archivo .env\n');
		} else if (error.code === 'ER_DB_CREATE_EXISTS') {
			console.error(`   La base de datos "${config.database}" ya existe.\n`);
		} else {
			console.error(`   Código: ${error.code}`);
			console.error(`   Mensaje: ${error.message}\n`);
		}

		process.exit(1);
	}
}

createDatabase();
