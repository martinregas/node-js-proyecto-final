import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;
    
    // DEBUG: Ver qué está recibiendo
    console.log('🔍 Authorization header recibido:', authHeader);
    console.log('🔍 Tipo:', typeof authHeader);

    if (!authHeader) {
      return res.status(401).json({
        error: 'Error de autenticación',
        message: 'Token no proporcionado'
      });
    }

    // El formato debe ser: "Bearer <token>"
    // Normalizar espacios no separadores (código 160) a espacios normales (32)
    const normalizedHeader = authHeader.replace(/\u00A0/g, ' ');
    
    if (!normalizedHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Error de autenticación',
        message: 'Formato de token inválido. Use: Bearer <token>'
      });
    }

    const token = normalizedHeader.substring(7); // Quitar "Bearer " (7 caracteres)
    console.log('🔍 Token extraído:', token);

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key');
    
    // Agregar información del usuario al request
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('❌ Error en authMiddleware:', error.name, error.message);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Error de autenticación',
        message: 'Token inválido o expirado'
      });
    }

    return res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al verificar el token'
    });
  }
};

export default authMiddleware;

