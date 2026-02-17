# SSC Backend Server

## Descripción
Servidor backend para la aplicación SSC, construido con Node.js, Express, TypeScript y Sequelize.

## Requisitos Previos
- Node.js (v18+)
- MySQL

## Instalación
1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno:
   - Copiar `.env.template` a `.env` y llenar los valores necesarios.

## Ejecución
- Desarrollo: `npm run dev`
- Producción: `npm run start`
- Tests: `npm run test`

---

## Documentación de API - Módulo Técnicos

Prefijo base: `/api/technician`

### Autenticación

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

#### Iniciar Sesión
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

### Perfil y Configuración

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
      "ApellidoMaterno": "Lopez",
      "Correo": "juan@example.com",
      "Telefono": "5512345678",
      "ImagenPerfil": "/uploads/profiles/avatar-123.jpg",
      "idioma": "es-MX",
      "divisa": "MXN",
      "monitoring_enabled": false,
      "monitoring_turno": "matutino",
      "monitoring_dias": "entre-semana",
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

#### Subir Imagen de Perfil
- **URL:** `/profile/avatar`
- **Método:** `POST`
- **Content-Type:** `multipart/form-data`
- **Body:** Campo `avatar` con el archivo de imagen.
- **Respuesta Exitosa (200):**
  ```json
  {
    "message": "Imagen de perfil actualizada exitosamente",
    "data": { "url": "/uploads/profiles/avatar-123.jpg" }
  }
  ```

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
