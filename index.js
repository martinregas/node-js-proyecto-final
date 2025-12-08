import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import productsRoutes from './src/routes/products.routes.js';
import authRoutes from './src/routes/auth.routes.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors());

// Configuración de body-parser para JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productsRoutes);
app.use('/auth', authRoutes);

// Middleware para rutas desconocidas (404)
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.method} ${req.path} no está definida`
  });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Error de autenticación
  if (err.name === 'UnauthorizedError' || err.status === 401) {
    return res.status(401).json({
      error: 'Error de autenticación',
      message: 'Token inválido o no proporcionado'
    });
  }

  // Error de autorización
  if (err.status === 403) {
    return res.status(403).json({
      error: 'Error de autorización',
      message: 'No tienes permisos para acceder a este recurso'
    });
  }

  // Error de validación (400)
  if (err.status === 400 || err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Error de validación',
      message: err.message || 'Los datos proporcionados son inválidos'
    });
  }

  // Error del servidor (500)
  res.status(500).json({
    error: 'Error interno del servidor',
    message: 'Ocurrió un error al procesar la solicitud'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});



