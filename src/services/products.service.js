import productsModel from '../models/products.model.js';

const productsService = {
  async getAllProducts() {
    try {
      return await productsModel.findAll();
    } catch (error) {
      console.error('Error en productsService.getAllProducts:', error);
      const serviceError = new Error('Error al obtener los productos');
      serviceError.status = 500;
      throw serviceError;
    }
  },

  async getProductById(id) {
    try {
      return await productsModel.findById(id);
    } catch (error) {
      console.error('Error en productsService.getProductById:', error);
      const serviceError = new Error('Error al obtener el producto');
      serviceError.status = 500;
      throw serviceError;
    }
  },

  async createProduct(productData) {
    try {
      return await productsModel.create(productData);
    } catch (error) {
      console.error('Error en productsService.createProduct:', error);
      const serviceError = new Error('Error al crear el producto');
      serviceError.status = 500;
      throw serviceError;
    }
  },

  async deleteProduct(id) {
    try {
      return await productsModel.delete(id);
    } catch (error) {
      console.error('Error en productsService.deleteProduct:', error);
      const serviceError = new Error('Error al eliminar el producto');
      serviceError.status = 500;
      throw serviceError;
    }
  }
};

export default productsService;



