import express from 'express';
import productsController from '../controllers/products.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// Todas las rutas de productos requieren autenticación
router.get('/', authMiddleware, productsController.getAllProducts);
router.get('/:id', authMiddleware, productsController.getProductById);
router.post('/create', authMiddleware, productsController.createProduct);
router.delete('/:id', authMiddleware, productsController.deleteProduct);

export default router;



