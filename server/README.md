# API REST - Documentación

## Descripción

API REST para el sistema de autenticación con Node.js, Express, TypeScript y Sequelize.

## Configuración Inicial

### Requisitos Previos

- Node.js (v22.18 o superior)
- MySQL
- npm o yarn

### Instalación

```bash
npm install
```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las variables que se encuentran en el `.env.template`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_base_datos
JWT_SECRET=tu_secret_key
```

### Iniciar el Servidor

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm run build
npm start
```

El servidor estará disponible en: `http://localhost:3000`

---

## Endpoints Disponibles

### 1. Registro de Usuario

Registra un nuevo usuario en el sistema.

**URL:** `POST /api/auth/register`

**Headers:**

```
Content-Type: application/json
```

**Body (JSON):**

```json
{
	"Nombre": "Juan",
	"Apellido_Paterno": "Pérez",
	"Apellido_Materno": "García",
	"Correo": "juan.perez@ejemplo.com",
	"Contrasenia": "MiContraseña123",
	"ConfirmarContrasenia": "MiContraseña123",
	"Telefono": "5512345678",
	"Consentimiento": true
}
```

**Validaciones:**

- `Nombre`: Requerido, mínimo 1 carácter, máximo 50 caracteres
- `Apellido_Paterno`: Requerido, mínimo 1 carácter, máximo 30 caracteres
- `Apellido_Materno`: Requerido, mínimo 1 carácter, máximo 30 caracteres
- `Correo`: Requerido, formato de email válido, máximo 100 caracteres
- `Contrasenia`: Requerido, mínimo 8 caracteres, máximo 255 caracteres
- `ConfirmarContrasenia`: Debe coincidir con `Contrasenia`
- `Telefono`: Requerido, exactamente 10 dígitos
- `Consentimiento`: Booleano, por defecto `true`

**Ejemplo con cURL:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "Nombre": "Juan",
    "Apellido_Paterno": "Pérez",
    "Apellido_Materno": "García",
    "Correo": "juan.perez@ejemplo.com",
    "Contrasenia": "MiContraseña123",
    "ConfirmarContrasenia": "MiContraseña123",
    "Telefono": "5512345678",
    "Consentimiento": true
  }'
```

**Ejemplo con JavaScript (Fetch API):**

```javascript
fetch("http://localhost:3000/api/auth/register", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({
		Nombre: "Juan",
		Apellido_Paterno: "Pérez",
		Apellido_Materno: "García",
		Correo: "juan.perez@ejemplo.com",
		Contrasenia: "MiContraseña123",
		ConfirmarContrasenia: "MiContraseña123",
		Telefono: "5512345678",
		Consentimiento: true,
	}),
})
	.then((response) => response.json())
	.then((data) => console.log(data))
	.catch((error) => console.error("Error:", error));
```

**Respuesta Exitosa (201):**

```json
{
	"message": "Usuario registrado exitosamente"
}
```

**Respuesta de Error (400):**

```json
{
	"message": "Error de validación",
	"errors": [
		{
			"campo": "Correo",
			"mensaje": "El correo no tiene un formato válido"
		},
		{
			"campo": "ConfirmarContrasenia",
			"mensaje": "Las contraseñas no coinciden"
		}
	]
}
```

---

### 2. Inicio de Sesión

Autentica un usuario y devuelve un token JWT.

**URL:** `POST /api/auth/login`

**Headers:**

```
Content-Type: application/json
```

**Body (JSON):**

```json
{
	"Correo": "juan.perez@ejemplo.com",
	"Contrasenia": "MiContraseña123"
}
```

**Validaciones:**

- `Correo`: Requerido, formato de email válido
- `Contrasenia`: Requerido, mínimo 8 carácteres

**Ejemplo con cURL:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "Correo": "juan.perez@ejemplo.com",
    "Contrasenia": "MiContraseña123"
  }'
```

**Ejemplo con JavaScript (Fetch API):**

```javascript
fetch("http://localhost:3000/api/auth/login", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({
		Correo: "juan.perez@ejemplo.com",
		Contrasenia: "MiContraseña123",
	}),
})
	.then((response) => response.json())
	.then((data) => {
		// Guarda el token para futuras peticiones
	})
	.catch((error) => console.error("Error:", error));
```

**Respuesta Exitosa (200):**

```json
{
	"message": "Login exitoso",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Respuesta de Error (401):**

```json
{
	"message": "Credenciales inválidas"
}
```

---

### 3. Obtener Perfil (Requiere Autenticación)

Obtiene el perfil del usuario autenticado.

**URL:** `GET /api/auth/profile`

**Headers:**

```
Authorization: Bearer <tu_token_jwt>
```

**Ejemplo con cURL:**

```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Cookie: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Ejemplo con JavaScript (Fetch API):**

```javascript
const token = localStorage.getItem("token");

fetch("http://localhost:3000/api/auth/profile", {
	method: "GET",
	headers: {
		Cookie: `${token}`,
	},
})
	.then((response) => response.json())
	.then((data) => console.log(data))
	.catch((error) => console.error("Error:", error));
```

**Respuesta Exitosa (200):**

```json
{
	"message": "Perfil obtenido exitosamente",
	"user": {
		"id": 1,
		"Nombre": "Juan",
		"Apellido_Paterno": "Pérez",
		"Apellido_Materno": "García",
		"Correo": "juan.perez@ejemplo.com",
		"Telefono": "5512345678"
	}
}
```

**Respuesta de Error (401):**

```json
{
	"message": "Token no proporcionado"
}
```

---

## Códigos de Estado HTTP

| Código | Significado                                             |
| ------ | ------------------------------------------------------- |
| 200    | OK - La petición fue exitosa                            |
| 201    | Created - Recurso creado exitosamente                   |
| 400    | Bad Request - Error de validación en los datos enviados |
| 401    | Unauthorized - No autenticado o token inválido          |
| 404    | Not Found - Recurso no encontrado                       |
| 500    | Internal Server Error - Error del servidor              |

---

## Estructura del Proyecto

```
server/
├── src/
│   ├── app.ts                 # Configuración de Express
│   ├── index.ts              # Punto de entrada
│   ├── modules/
│   │   └── auth/
│   │       ├── auth.route.ts          # Rutas de autenticación
│   │       ├── controllers/
│   │       │   └── auth.controller.ts # Controladores
│   │       ├── middleware/
│   │       │   └── auth.middleware.ts # Middleware de autenticación
│   │       ├── repositories/
│   │       │   └── auth.repository.ts # Modelos de datos
│   │       ├── services/
│   │       │   └── auth.services.ts   # Lógica de negocio
│   │       └── validators/
│   │           └── auth.validation.ts # Validaciones con Zod
│   └── router/
│       └── main.route.ts     # Router principal
├── package.json
├── tsconfig.json
└── README.md
```

---

## Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **TypeScript** - Lenguaje de programación
- **Sequelize** - ORM para MySQL
- **MySQL** - Base de datos
- **JWT** - Autenticación basada en tokens
- **Bcrypt** - Encriptación de contraseñas
- **Zod** - Validación de esquemas

---

## Notas Importantes

1. **Seguridad:** Nunca compartas tu `JWT_SECRET` en repositorios públicos
2. **Contraseñas:** Se encriptan automáticamente con bcrypt antes de guardarse
3. **Tokens JWT:** Tienen una expiración configurable, guárdalos de forma segura
4. **CORS:** Si necesitas hacer peticiones desde un frontend en otro puerto, configura CORS en `app.ts`

---

## Soporte

Para reportar problemas o sugerencias, contacta al equipo de desarrollo.
