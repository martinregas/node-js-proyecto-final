import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let db = null;

export const initializeFirestore = () => {
  if (db) {
    return db;
  }

  try {
    // Verificar que las variables de entorno estén configuradas
    if (!process.env.FIREBASE_PROJECT_ID || 
        !process.env.FIREBASE_PRIVATE_KEY || 
        !process.env.FIREBASE_CLIENT_EMAIL) {
      throw new Error('Las variables de entorno de Firebase no están configuradas correctamente');
    }

    // Inicializar Firebase Admin
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL
    };

    initializeApp({
      credential: cert(serviceAccount)
    });

    db = getFirestore();
    console.log('Firebase Firestore conectado correctamente');
    
    return db;
  } catch (error) {
    console.error('Error al inicializar Firebase:', error);
    throw new Error('Error al conectar con Firebase Firestore');
  }
};

