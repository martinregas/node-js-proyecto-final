import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 Configuración de Firebase\n');
console.log('Este script te ayudará a configurar las variables de entorno de Firebase.\n');

rl.question('Ingresa la ruta completa del archivo JSON descargado de Firebase (o presiona Enter para salir): ', (jsonPath) => {
  if (!jsonPath.trim()) {
    console.log('Operación cancelada.');
    rl.close();
    return;
  }

  try {
    // Leer el archivo JSON
    const jsonContent = fs.readFileSync(jsonPath.trim(), 'utf8');
    const serviceAccount = JSON.parse(jsonContent);

    // Mostrar los valores que se usarán
    console.log('\n✅ Valores encontrados:');
    console.log(`Project ID: ${serviceAccount.project_id}`);
    console.log(`Client Email: ${serviceAccount.client_email}`);
    console.log(`Private Key: ${serviceAccount.private_key.substring(0, 50)}...\n`);

    // Leer el archivo .env actual
    let envContent = '';
    try {
      envContent = fs.readFileSync('.env', 'utf8');
    } catch (error) {
      console.log('⚠️  No se encontró archivo .env, se creará uno nuevo.');
    }

    // Actualizar las variables de Firebase
    const lines = envContent.split('\n');
    const updatedLines = lines.map(line => {
      if (line.startsWith('FIREBASE_PROJECT_ID=')) {
        return `FIREBASE_PROJECT_ID=${serviceAccount.project_id}`;
      }
      if (line.startsWith('FIREBASE_PRIVATE_KEY=')) {
        // Escapar las comillas y saltos de línea para .env
        const escapedKey = serviceAccount.private_key.replace(/\n/g, '\\n');
        return `FIREBASE_PRIVATE_KEY="${escapedKey}"`;
      }
      if (line.startsWith('FIREBASE_CLIENT_EMAIL=')) {
        return `FIREBASE_CLIENT_EMAIL=${serviceAccount.client_email}`;
      }
      return line;
    });

    // Si no existían las líneas, agregarlas
    if (!updatedLines.some(line => line.startsWith('FIREBASE_PROJECT_ID='))) {
      updatedLines.push(`FIREBASE_PROJECT_ID=${serviceAccount.project_id}`);
    }
    if (!updatedLines.some(line => line.startsWith('FIREBASE_PRIVATE_KEY='))) {
      const escapedKey = serviceAccount.private_key.replace(/\n/g, '\\n');
      updatedLines.push(`FIREBASE_PRIVATE_KEY="${escapedKey}"`);
    }
    if (!updatedLines.some(line => line.startsWith('FIREBASE_CLIENT_EMAIL='))) {
      updatedLines.push(`FIREBASE_CLIENT_EMAIL=${serviceAccount.client_email}`);
    }

    // Escribir el archivo .env actualizado
    fs.writeFileSync('.env', updatedLines.join('\n'));

    console.log('✅ Archivo .env actualizado correctamente!\n');
    console.log('📝 Recuerda:');
    console.log('   - El archivo .env ya contiene tus credenciales de Firebase');
    console.log('   - NO subas el archivo .env a Git (ya está en .gitignore)');
    console.log('   - Puedes eliminar el archivo JSON descargado después de configurar\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Asegúrate de:');
    console.log('   - Que la ruta del archivo sea correcta');
    console.log('   - Que el archivo sea un JSON válido de Firebase\n');
  }

  rl.close();
});



