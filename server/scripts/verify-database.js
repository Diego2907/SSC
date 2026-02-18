/**
 * Script de verificación de base de datos
 * Este script verifica la conexión a MySQL y la existencia de la base de datos
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

async function verifyDatabase() {
	console.log('🔍 Verificando configuración de MySQL...\n');
	console.log('📋 Configuración actual:');
	console.log(`   Host: ${config.host}`);
	console.log(`   Puerto: ${config.port}`);
	console.log(`   Usuario: ${config.user}`);
	console.log(`   Base de datos: ${config.database || '(no especificada)'}\n`);

	let connection;

	try {
		// Intentar conectar sin especificar base de datos
		console.log('1️⃣ Intentando conectar a MySQL...');
		connection = await mysql.createConnection({
			host: config.host,
			port: config.port,
			user: config.user,
			password: config.password,
		});

		console.log('   ✅ Conexión a MySQL exitosa!\n');

		// Verificar si la base de datos existe
		if (config.database) {
			console.log(`2️⃣ Verificando si la base de datos "${config.database}" existe...`);
			const [databases] = await connection.execute(
				'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?',
				[config.database]
			);

			if (databases.length > 0) {
				console.log(`   ✅ La base de datos "${config.database}" existe!\n`);

				// Verificar permisos del usuario
				console.log(`3️⃣ Verificando permisos del usuario "${config.user}"...`);
				const [grants] = await connection.execute('SHOW GRANTS FOR CURRENT_USER()');
				console.log('   ✅ Permisos verificados\n');

				// Intentar usar la base de datos
				console.log(`4️⃣ Intentando usar la base de datos "${config.database}"...`);
				// USE no se puede usar como prepared statement, usar query directa
				await connection.query(`USE \`${config.database}\``);
				console.log(`   ✅ Acceso a la base de datos "${config.database}" exitoso!\n`);

				// Verificar tablas existentes
				const [tables] = await connection.execute('SHOW TABLES');
				console.log(`5️⃣ Tablas existentes en "${config.database}":`);
				if (tables.length === 0) {
					console.log('   ⚠️  No hay tablas. Las tablas se crearán automáticamente cuando inicies el servidor.\n');
				} else {
					console.log(`   📊 Total: ${tables.length} tabla(s)`);
					tables.forEach((table) => {
						const tableName = Object.values(table)[0];
						console.log(`      - ${tableName}`);
					});
					console.log('');
				}

				console.log('✅ ¡Todo está configurado correctamente!\n');
				console.log('🚀 Puedes iniciar el servidor con: npm run dev\n');
			} else {
				console.log(`   ❌ La base de datos "${config.database}" NO existe.\n`);
				console.log('📝 Para crear la base de datos, ejecuta el siguiente comando SQL:');
				console.log(`   CREATE DATABASE ${config.database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n`);
				console.log('   O ejecuta: npm run create-db\n');
			}
		} else {
			console.log('   ⚠️  No se especificó nombre de base de datos en .env\n');
			console.log('   Edita el archivo .env y configura DB_USER_NAME\n');
		}

		// Mostrar todas las bases de datos disponibles
		console.log('📚 Bases de datos disponibles en el servidor:');
		const [allDatabases] = await connection.execute('SHOW DATABASES');
		allDatabases.forEach((db) => {
			const dbName = Object.values(db)[0];
			// Omitir bases de datos del sistema
			if (!['information_schema', 'performance_schema', 'mysql', 'sys'].includes(dbName)) {
				console.log(`   - ${dbName}`);
			}
		});
		console.log('');

		await connection.end();
	} catch (error) {
		console.error('❌ Error al verificar la base de datos:\n');
		
		if (error.code === 'ECONNREFUSED') {
			console.error('   El servidor MySQL no está corriendo o no está accesible en el puerto especificado.');
			console.error('   Verifica que el servicio MySQL esté iniciado.\n');
		} else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
			console.error('   Credenciales incorrectas (usuario o contraseña).');
			console.error('   Verifica las credenciales en el archivo .env\n');
		} else if (error.code === 'ER_BAD_DB_ERROR') {
			console.error(`   La base de datos "${config.database}" no existe.`);
			console.error('   Necesitas crearla primero.\n');
		} else {
			console.error(`   Código: ${error.code}`);
			console.error(`   Mensaje: ${error.message}\n`);
		}

		console.log('💡 Soluciones posibles:');
		console.log('   1. Verifica que MySQL esté corriendo');
		console.log('   2. Revisa las credenciales en server/.env');
		console.log('   3. Asegúrate de que el usuario tenga permisos\n');

		process.exit(1);
	}
}

verifyDatabase();
