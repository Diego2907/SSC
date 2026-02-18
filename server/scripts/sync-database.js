/**
 * Script para sincronizar las tablas de la base de datos
 * Crea todas las tablas según los modelos de Sequelize
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Cargar variables de entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

// Importar modelos (esto asegura que se registren en Sequelize)
import '../src/modules/auth/repositories/auth.repository.ts';
import '../src/modules/users/repositories/usuario.repository.ts';
import '../src/modules/users/repositories/codigoPostal.repository.ts';

import sequelize from '../src/config/database.config.ts';
import { Usuario } from '../src/modules/auth/repositories/auth.repository.ts';
import { Domicilio } from '../src/modules/users/repositories/usuario.repository.ts';
import { CodigoPostal } from '../src/modules/users/repositories/codigoPostal.repository.ts';

async function syncDatabase() {
	console.log('🔄 Sincronizando base de datos...\n');

	try {
		// Verificar conexión
		await sequelize.authenticate();
		console.log('✅ Conexión a la base de datos establecida.\n');

		// Definir relaciones entre modelos
		console.log('📋 Configurando relaciones entre tablas...');
		
		// Relación: Un Usuario puede tener muchos Domicilios
		Usuario.hasMany(Domicilio, {
			foreignKey: 'id_Usuario',
			as: 'domicilios',
		});

		// Relación: Un Domicilio pertenece a un Usuario
		Domicilio.belongsTo(Usuario, {
			foreignKey: 'id_Usuario',
			as: 'usuario',
		});

		console.log('✅ Relaciones configuradas.\n');

		// Sincronizar tablas
		// force: false = no elimina tablas existentes
		// alter: true = actualiza la estructura si hay cambios
		console.log('📝 Creando/actualizando tablas...\n');

		// Crear tablas en el orden correcto (primero las que no tienen dependencias)
		await CodigoPostal.sync({ alter: true });
		console.log('   ✅ Tabla "codigos_postales" sincronizada');

		await Usuario.sync({ alter: true });
		console.log('   ✅ Tabla "usuarios" sincronizada');

		await Domicilio.sync({ alter: true });
		console.log('   ✅ Tabla "domicilios" sincronizada');

		console.log('\n✅ ¡Base de datos sincronizada exitosamente!\n');

		// Mostrar resumen de tablas
		console.log('📊 Resumen de tablas creadas:');
		const [tables] = await sequelize.query("SHOW TABLES");
		tables.forEach((table) => {
			const tableName = Object.values(table)[0];
			console.log(`   - ${tableName}`);
		});
		console.log('');

		// Cerrar conexión
		await sequelize.close();
		console.log('✅ Proceso completado.\n');
		console.log('🚀 Ahora puedes usar el servidor normalmente.\n');

		process.exit(0);
	} catch (error) {
		console.error('❌ Error al sincronizar la base de datos:\n');
		console.error(`   Código: ${error.code || 'N/A'}`);
		console.error(`   Mensaje: ${error.message}\n`);

		if (error.message.includes('ECONNREFUSED')) {
			console.error('💡 Verifica que MySQL esté corriendo.\n');
		} else if (error.message.includes('Access denied')) {
			console.error('💡 Verifica las credenciales en el archivo .env\n');
		}

		await sequelize.close();
		process.exit(1);
	}
}

syncDatabase();
