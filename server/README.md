# API REST - Documentación

## Descripción

API REST para el sistema gestor de usuarios para MiPyMes y módulo de técnicos SSC.

## Configuración Inicial

### Requisitos Previos

- Node.js (v18+ / v22.18 recomendado)
- MySQL
- npm o yarn

### Instalación

1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto con las variables necesarias.

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las variables que se encuentran en el [.env.template](.env.template):

```env
# ==============================================
# CONFIGURACIÓN DEL SERVIDOR
# ==============================================
PORT=3000
NODE_ENV=development #? development, production, test

# ==============================================
# API KEYS
# ==============================================
DIPOMEX_KEY=tu_api_key_aqui

# ==============================================
# SEGURIDAD Y SECRETOS
# ==============================================
JWT_SECRET=tu_secreto_super_seguro_aqui
JWT_EXPIRES_IN=1d

# ==============================================
# BASE DE DATOS USUARIOS
# ==============================================
DB_USER_HOST=localhost
DB_USER_PORT=3306
DB_USER_USER=user_db
DB_USER_PASSWORD=user_password
DB_USER_NAME=nombre_base_datos
```

### Iniciar el Servidor

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm run build
npm start

# Tests
npm run test
```

El servidor estará disponible en: `http://localhost:3000`

---

## Endpoints Disponibles - Clientes (Auth General)

### 1. Registro de Usuario

Registra un nuevo usuario en el sistema.

**URL:** `POST /api/auth/register`

**Headers:** `Content-Type: application/json`

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

**Respuesta Exitosa (201):**

```json
{
	"message": "Usuario registrado exitosamente"
}
```

### 2. Inicio de Sesión

Autentica un usuario y devuelve un token JWT.

**URL:** `POST /api/auth/login`

**Body (JSON):**

```json
{
	"Correo": "juan.perez@ejemplo.com",
	"Contrasenia": "MiContraseña123"
}
```

**Respuesta Exitosa (200):**

```json
{
	"message": "Login exitoso",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Obtener Perfil (Requiere Autenticación)

**URL:** `GET /api/auth/profile`

**Headers:** `Authorization: Bearer <tu_token_jwt>` o Cookie `token`.

---

## Documentación de API - Módulo Técnicos

Prefijo base: `/api/technician`

### Autenticación Técnicos

#### Registro de Técnico
- **URL:** `/register`
- **Método:** `POST`
- **Body:**
  ```json
  {
    "nombre": "Juan",
    "apellido_paterno": "Perez",
    "apellido_materno": "Lopez",
    "email": "juan@example.com",
    "telefono": "5512345678",
    "password": "Password123!",
    "password_confirmation": "Password123!",
    "terms_accepted": true
  }
  ```
- **Respuesta Exitosa (201):**
  ```json
  {
    "message": "Técnico registrado exitosamente",
    "data": { ... }
  }
  ```

#### Iniciar Sesión Técnico
- **URL:** `/login`
- **Método:** `POST`
- **Body:**
  ```json
  {
    "email": "juan@example.com",
    "password": "Password123!"
  }
  ```
- **Respuesta Exitosa (200):**
  - Devuelve cookie `token` (HttpOnly).
  ```json
  {
    "message": "Inicio de sesión exitoso",
    "data": { "token": "..." }
  }
  ```

#### Cerrar Sesión
- **URL:** `/logout`
- **Método:** `POST`
- **Respuesta Exitosa (200):** Limpia la cookie de sesión.

### Perfil y Configuración (Técnicos)

#### Obtener Perfil
- **URL:** `/profile`
- **Método:** `GET`
- **Headers:** Requiere autenticación (Cookie o Token).
- **Respuesta Exitosa (200):**
  ```json
  {
    "data": {
      "Nombre": "Juan",
      "ApellidoPaterno": "Perez",
      "Correo": "juan@example.com",
      "monitoring_enabled": false,
      "vacation_mode": false
    }
  }
  ```

#### Actualizar Perfil
- **URL:** `/profile`
- **Método:** `PATCH`
- **Descripción:** Actualiza datos personales y configuración operativa.
- **Body (Ejemplo):**
  ```json
  {
    "nombre": "Juan Carlos",
    "telefono": "5587654321",
    "monitoring_enabled": true,
    "vacation_mode": false
  }
  ```
- **Nota de Negocio:** Si se activa `vacation_mode` (`true`), el sistema automáticamente desactiva `monitoring_enabled` (`false`).

### Seguridad

#### Cambiar Contraseña
- **URL:** `/change-password`
- **Método:** `POST`
- **Body:**
  ```json
  {
    "current_password": "OldPassword123!",
    "new_password": "NewPassword123!",
    "new_password_confirmation": "NewPassword123!"
  }
  ```

---

## Disponibilidad y Asignación de Tareas
Para determinar si un técnico está disponible para recibir nuevas tareas, el sistema debe validar:
1. `is_active === true` (Cuenta activa)
2. `monitoring_enabled === true` (Monitoreo encendido)
3. `vacation_mode === false` (No está de vacaciones)

El endpoint de perfil retorna estos estados para que el frontend pueda mostrar la disponibilidad actual.

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
