import { initializeFirestore } from './src/config/firebase.config.js';

console.log('🔍 Probando conexión con Firebase Firestore...\n');

try {
  const db = initializeFirestore();
  console.log('✅ Conexión exitosa con Firebase!\n');
  
  // Intentar leer la colección products
  const productsRef = db.collection('products');
  const snapshot = await productsRef.get();
  
  if (snapshot.empty) {
    console.log('⚠️  La colección "products" está vacía o no existe.');
    console.log('   Crea la colección "products" en Firestore para continuar.\n');
  } else {
    console.log(`✅ Colección "products" encontrada con ${snapshot.size} documento(s):\n`);
    snapshot.forEach(doc => {
      console.log(`   - ID: ${doc.id}`);
      console.log(`     Datos:`, doc.data());
      console.log('');
    });
  }
  
  console.log('🎉 ¡Todo está configurado correctamente!');
  process.exit(0);
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('\n💡 Verifica:');
  console.error('   - Que las variables de entorno en .env estén correctas');
  console.error('   - Que hayas creado la base de datos en Firestore');
  console.error('   - Que hayas creado la colección "products"\n');
  process.exit(1);
}



