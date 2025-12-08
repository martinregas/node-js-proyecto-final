# Proyecto Final - API Rest para Administración de Productos

API Rest desarrollada con Node.js, Express, Firebase Firestore y JWT para la administración de productos.

## Requisitos Previos

- Node.js instalado
- Cuenta de Firebase con un proyecto Firestore configurado

## Instalación

1. Instalar las dependencias:
```bash
npm install
```

2. Configurar las variables de entorno en el archivo `.env`:
   - `FIREBASE_PROJECT_ID`: ID de tu proyecto de Firebase
   - `FIREBASE_PRIVATE_KEY`: Clave privada de tu cuenta de servicio de Firebase
   - `FIREBASE_CLIENT_EMAIL`: Email de tu cuenta de servicio de Firebase
   - `JWT_SECRET`: Clave secreta para firmar los tokens JWT
   - `JWT_EXPIRES_IN`: Tiempo de expiración del token (ej: 24h)
   - `PORT`: Puerto del servidor (por defecto 3000)
   - `ADMIN_USER`: Usuario administrador
   - `ADMIN_PASSWORD`: Contraseña del administrador

## Configuración de Firebase

### Paso 1: Generar cuenta de servicio

1. Ve a la consola de Firebase: https://console.firebase.google.com/
2. Selecciona tu proyecto
3. Haz clic en el ícono de ⚙️ (configuración) junto a "Project Overview"
4. Selecciona "Project settings"
5. Ve a la pestaña **"Service accounts"**
6. En la sección "Firebase Admin SDK", haz clic en **"Generate new private key"**
7. Confirma la acción (aparecerá una advertencia sobre la seguridad de la clave)
8. Se descargará un archivo JSON con tus credenciales (ej: `tu-proyecto-firebase-adminsdk-xxxxx.json`)

### Paso 2: Configurar variables de entorno

**Opción A: Usar el script de ayuda (recomendado)**
```bash
node setup-firebase.js
```
El script te pedirá la ruta del archivo JSON descargado y actualizará automáticamente tu `.env`.

**Opción B: Configuración manual**
1. Abre el archivo JSON descargado
2. Abre el archivo `.env` en tu proyecto
3. Reemplaza los valores con los del JSON:
   - `FIREBASE_PROJECT_ID` = valor de `project_id`
   - `FIREBASE_PRIVATE_KEY` = valor de `private_key` (mantén las comillas y los `\n`)
   - `FIREBASE_CLIENT_EMAIL` = valor de `client_email`

**⚠️ Importante:** 
- El `private_key` debe estar entre comillas en el `.env`
- Los saltos de línea deben estar como `\n` (no como saltos reales)
- Ejemplo: `FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQ...\n-----END PRIVATE KEY-----\n"`

### Paso 3: Configurar Firestore

1. En la consola de Firebase, ve a **Firestore Database**
2. Crea una base de datos (si no existe)
3. Crea una colección llamada **`products`**
4. (Opcional) Crea un documento de ejemplo para definir la estructura:
   ```json
   {
     "name": "Producto Ejemplo",
     "price": 100,
     "description": "Descripción del producto",
     "createdAt": "2024-01-01T00:00:00.000Z",
     "updatedAt": "2024-01-01T00:00:00.000Z"
   }
   ```

## Ejecución

```bash
npm run start
```

El servidor estará disponible en `http://localhost:3000`

## Endpoints

### Autenticación

- **POST /auth/login**
  - Body: `{ "username": "admin", "password": "admin123" }`
  - Retorna: `{ "token": "..." }`

### Productos (requieren autenticación)

- **GET /api/products** - Obtener todos los productos
- **GET /api/products/:id** - Obtener un producto por ID
- **POST /api/products/create** - Crear un nuevo producto
  - Body: `{ "name": "Producto", "price": 100, ... }`
- **DELETE /api/products/:id** - Eliminar un producto

## Uso de la API

1. Primero, autentícate con `/auth/login` para obtener un token
2. Usa el token en el header `Authorization: Bearer <token>` para acceder a las rutas de productos

## Manejo de Errores

- **400**: Error de validación en los datos
- **401**: Error de autenticación (token inválido o no proporcionado)
- **403**: Error de autorización
- **404**: Ruta no encontrada o recurso no existe
- **500**: Error interno del servidor
