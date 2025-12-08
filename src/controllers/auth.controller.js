import authService from '../services/auth.service.js';

const authController = {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        const error = new Error('Usuario y contraseña son requeridos');
        error.status = 400;
        throw error;
      }

      const token = await authService.login(username, password);

      if (!token) {
        return res.status(401).json({
          error: 'Error de autenticación',
          message: 'Credenciales inválidas'
        });
      }

      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
};

export default authController;



