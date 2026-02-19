/**
 * Script de diagnóstico para identificar cómo está instalado MySQL
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

console.log('🔍 Diagnóstico de MySQL\n');
console.log('='.repeat(50));
console.log('');

// 1. Verificar versión de MySQL
console.log('1️⃣ Verificando instalación de MySQL...');
try {
	const version = execSync('mysql --version', { encoding: 'utf-8' }).trim();
	console.log(`   ✅ MySQL encontrado: ${version}\n`);
} catch (error) {
	console.log('   ❌ MySQL no está en el PATH\n');
}

// 2. Verificar servicios de Windows
console.log('2️⃣ Verificando servicios de MySQL en Windows...');
try {
	const services = execSync(
		'Get-Service -Name "*mysql*" | Select-Object Name, Status, DisplayName | Format-Table -AutoSize',
		{ shell: 'powershell.exe', encoding: 'utf-8' }
	);
	
	if (services.trim().length > 0) {
		console.log('   ✅ Servicios MySQL encontrados:');
		console.log(services);
	} else {
		console.log('   ⚠️  No se encontraron servicios MySQL registrados\n');
	}
} catch (error) {
	console.log('   ⚠️  No se encontraron servicios MySQL\n');
}

// 3. Verificar procesos corriendo
console.log('3️⃣ Verificando si MySQL está corriendo...');
try {
	const processes = execSync(
		'Get-Process -Name "*mysql*" -ErrorAction SilentlyContinue | Select-Object ProcessName, Id | Format-Table -AutoSize',
		{ shell: 'powershell.exe', encoding: 'utf-8' }
	);
	
	if (processes.trim().length > 0) {
		console.log('   ✅ Procesos MySQL encontrados:');
		console.log(processes);
	} else {
		console.log('   ❌ MySQL NO está corriendo actualmente\n');
	}
} catch (error) {
	console.log('   ❌ MySQL NO está corriendo actualmente\n');
}

// 4. Verificar rutas comunes de instalación
console.log('4️⃣ Verificando rutas comunes de instalación...');
const commonPaths = [
	'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysqld.exe',
	'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe',
	'C:\\Program Files (x86)\\MySQL\\MySQL Server 8.0\\bin\\mysqld.exe',
	'C:\\xampp\\mysql\\bin\\mysqld.exe',
	'C:\\xampp\\mysql\\bin\\mysql.exe',
	'C:\\wamp64\\bin\\mysql\\mysql8.0.xx\\bin\\mysqld.exe',
	'C:\\MAMP\\bin\\mysql\\bin\\mysqld.exe',
];

let foundPath = null;
for (const path of commonPaths) {
	if (existsSync(path)) {
		console.log(`   ✅ Encontrado: ${path}`);
		foundPath = path;
	}
}

if (!foundPath) {
	console.log('   ⚠️  No se encontró MySQL en las rutas comunes\n');
} else {
	console.log('');
}

// 5. Verificar XAMPP
console.log('5️⃣ Verificando XAMPP...');
if (existsSync('C:\\xampp\\xampp-control.exe')) {
	console.log('   ✅ XAMPP está instalado');
	console.log('   💡 Para iniciar MySQL: Abre XAMPP Control Panel y presiona "Start" en MySQL\n');
} else {
	console.log('   ❌ XAMPP no está instalado\n');
}

// 6. Verificar WAMP
console.log('6️⃣ Verificando WAMP...');
if (existsSync('C:\\wamp64\\wampmanager.exe') || existsSync('C:\\wamp\\wampmanager.exe')) {
	console.log('   ✅ WAMP está instalado');
	console.log('   💡 Para iniciar MySQL: Abre WAMP y asegúrate de que MySQL esté verde\n');
} else {
	console.log('   ❌ WAMP no está instalado\n');
}

// 7. Verificar MAMP
console.log('7️⃣ Verificando MAMP...');
if (existsSync('C:\\MAMP\\MAMP.exe')) {
	console.log('   ✅ MAMP está instalado');
	console.log('   💡 Para iniciar MySQL: Abre MAMP y presiona "Start Servers"\n');
} else {
	console.log('   ❌ MAMP no está instalado\n');
}

// 8. Intentar conectar
console.log('8️⃣ Intentando conectar a MySQL...');
try {
	const testConnection = execSync('mysql -u root -e "SELECT 1" 2>&1', { encoding: 'utf-8' });
	console.log('   ✅ Se puede conectar a MySQL (sin contraseña)\n');
} catch (error) {
	const errorMsg = error.message || error.toString();
	if (errorMsg.includes('Access denied')) {
		console.log('   ⚠️  MySQL está corriendo pero requiere contraseña\n');
	} else if (errorMsg.includes('Can\'t connect') || errorMsg.includes('ERROR 2003')) {
		console.log('   ❌ MySQL NO está corriendo o no es accesible\n');
	} else {
		console.log(`   ⚠️  ${errorMsg}\n`);
	}
}

// Resumen y recomendaciones
console.log('='.repeat(50));
console.log('📋 RESUMEN Y RECOMENDACIONES\n');

if (foundPath) {
	console.log('✅ MySQL está instalado en tu sistema');
	console.log(`   Ruta: ${foundPath}\n`);
	
	if (foundPath.includes('xampp')) {
		console.log('💡 SOLUCIÓN:');
		console.log('   1. Abre XAMPP Control Panel');
		console.log('   2. Presiona "Start" en MySQL');
		console.log('   3. Usa las credenciales: usuario="root", contraseña="" (vacía)\n');
	} else if (foundPath.includes('wamp')) {
		console.log('💡 SOLUCIÓN:');
		console.log('   1. Abre WAMP');
		console.log('   2. Asegúrate de que MySQL esté verde (corriendo)');
		console.log('   3. Usa las credenciales que configuraste en WAMP\n');
	} else if (foundPath.includes('MAMP')) {
		console.log('💡 SOLUCIÓN:');
		console.log('   1. Abre MAMP');
		console.log('   2. Presiona "Start Servers"');
		console.log('   3. Usa las credenciales que configuraste en MAMP\n');
	} else {
		console.log('💡 SOLUCIÓN:');
		console.log('   1. Abre "Servicios" de Windows (Win+R, escribe: services.msc)');
		console.log('   2. Busca "MySQL80" o similar');
		console.log('   3. Haz clic derecho → "Iniciar"');
		console.log('   4. O ejecuta manualmente desde:');
		console.log(`      ${foundPath.replace('mysql.exe', 'mysqld.exe')} --console\n`);
	}
} else {
	console.log('⚠️  No se pudo identificar la instalación de MySQL automáticamente\n');
	console.log('💡 OPCIONES:');
	console.log('   1. Si instalaste MySQL manualmente:');
	console.log('      - Abre "Servicios" (Win+R → services.msc)');
	console.log('      - Busca y inicia el servicio MySQL\n');
	console.log('   2. Si usas XAMPP/WAMP/MAMP:');
	console.log('      - Abre el panel de control correspondiente');
	console.log('      - Inicia MySQL desde ahí\n');
	console.log('   3. Si no tienes MySQL instalado:');
	console.log('      - Descarga XAMPP: https://www.apachefriends.org/');
	console.log('      - O instala MySQL: https://dev.mysql.com/downloads/installer/\n');
}

console.log('='.repeat(50));
