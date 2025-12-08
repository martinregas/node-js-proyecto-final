import jwt from 'jsonwebtoken';

const authService = {
  async login(username, password) {
    try {
      // Validación de credenciales
      // En producción, esto debería consultar Firestore o una base de datos
      const validUsername = process.env.ADMIN_USER || 'admin';
      const validPassword = process.env.ADMIN_PASSWORD || 'admin123';

      if (username !== validUsername || password !== validPassword) {
        return null;
      }

      // Generar token JWT
      const token = jwt.sign(
        { username },
        process.env.JWT_SECRET || 'secret-key',
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      return token;
    } catch (error) {
      console.error('Error en authService.login:', error);
      throw error;
    }
  }
};

export default authService;

