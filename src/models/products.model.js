import { initializeFirestore } from '../config/firebase.config.js';

const COLLECTION_NAME = 'products';

const productsModel = {
  async findAll() {
    try {
      const db = initializeFirestore();
      const productsRef = db.collection(COLLECTION_NAME);
      const snapshot = await productsRef.get();

      if (snapshot.empty) {
        return [];
      }

      const products = [];
      snapshot.forEach(doc => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return products;
    } catch (error) {
      console.error('Error en productsModel.findAll:', error);
      throw error;
    }
  },

  async findById(id) {
    try {
      const db = initializeFirestore();
      const doc = await db.collection(COLLECTION_NAME).doc(id).get();

      if (!doc.exists) {
        return null;
      }

      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      console.error('Error en productsModel.findById:', error);
      throw error;
    }
  },

  async create(productData) {
    try {
      const db = initializeFirestore();
      const docRef = await db.collection(COLLECTION_NAME).add({
        ...productData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      const newDoc = await docRef.get();
      return {
        id: newDoc.id,
        ...newDoc.data()
      };
    } catch (error) {
      console.error('Error en productsModel.create:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const db = initializeFirestore();
      const docRef = db.collection(COLLECTION_NAME).doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        return false;
      }

      await docRef.delete();
      return true;
    } catch (error) {
      console.error('Error en productsModel.delete:', error);
      throw error;
    }
  }
};

export default productsModel;



