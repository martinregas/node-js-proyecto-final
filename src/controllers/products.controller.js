import productsService from '../services/products.service.js';

const productsController = {
  async getAllProducts(req, res, next) {
    try {
      const products = await productsService.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  },

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productsService.getProductById(id);
      
      if (!product) {
        return res.status(404).json({
          error: 'Producto no encontrado',
          message: `No se encontró un producto con el ID ${id}`
        });
      }
      
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  async createProduct(req, res, next) {
    try {
      const productData = req.body;
      
      // Validación básica
      if (!productData.name || !productData.price) {
        const error = new Error('El nombre y el precio son requeridos');
        error.status = 400;
        throw error;
      }

      const newProduct = await productsService.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await productsService.deleteProduct(id);
      
      if (!deleted) {
        return res.status(404).json({
          error: 'Producto no encontrado',
          message: `No se encontró un producto con el ID ${id}`
        });
      }
      
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      next(error);
    }
  }
};

export default productsController;



