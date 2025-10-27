import 'dotenv/config';
import fetch from 'node-fetch';
import readline from 'readline';

// Configuración de Supabase desde variables de entorno
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

// Nombre de la tabla en Supabase
const TABLE_NAME = 'personas';

// Validación de variables de entorno
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Faltan las credenciales de Supabase.');
  console.error('Por favor, crea un archivo .env con:');
  console.error('  VITE_SUPABASE_URL=https://tu-proyecto.supabase.co');
  console.error('  VITE_SUPABASE_KEY=tu-anon-key');
  process.exit(1);
}

/**
 * Pregunta al usuario por confirmación
 * @param {string} question - Pregunta a realizar
 * @returns {Promise<boolean>} - true si el usuario confirma
 */
const askConfirmation = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 's' || answer.toLowerCase() === 'y');
    });
  });
};

/**
 * Obtiene todos los registros de la tabla
 * @returns {Promise<Array>} - Array de registros
 */
const getAllRecords = async () => {
  const response = await fetch(`${supabaseUrl}/rest/v1/${TABLE_NAME}?select=*`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener registros: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};

/**
 * Elimina todos los registros de la tabla
 * @returns {Promise<Object>} - Resultado de la operación
 */
const clearAllRecords = async () => {
  // Supabase requiere un filtro para DELETE, usamos un filtro que siempre es verdadero
  // Nota: Esto requiere que la política RLS permita DELETE
  const response = await fetch(`${supabaseUrl}/rest/v1/${TABLE_NAME}?id=neq.00000000-0000-0000-0000-000000000000`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Prefer': 'return=representation'
    },
  });

  const data = await response.text();
  
  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    data: data ? JSON.parse(data) : null
  };
};

/**
 * Script principal para limpiar la tabla
 */
const clearData = async () => {
  console.log('🗑️  Script de Limpieza de Datos - Supabase\n');
  console.log(`🎯 Tabla: ${TABLE_NAME}`);
  console.log(`🔗 URL: ${supabaseUrl}\n`);
  console.log('─'.repeat(60));

  try {
    // Obtener registros actuales
    console.log('\n📊 Consultando registros actuales...');
    const records = await getAllRecords();
    
    if (records.length === 0) {
      console.log('✅ La tabla ya está vacía. No hay nada que eliminar.');
      process.exit(0);
    }

    console.log(`\n⚠️  Se encontraron ${records.length} registro(s) en la tabla "${TABLE_NAME}"`);
    
    // Mostrar algunos registros como ejemplo
    console.log('\n📋 Primeros registros:');
    records.slice(0, 5).forEach((record, index) => {
      console.log(`   ${index + 1}. ${record.nombre} ${record.apellidos} (${record.organismo})`);
    });
    
    if (records.length > 5) {
      console.log(`   ... y ${records.length - 5} más`);
    }

    // Pedir confirmación
    console.log('\n' + '⚠️ '.repeat(30));
    console.log('⚠️  ADVERTENCIA: Esta acción eliminará TODOS los registros');
    console.log('⚠️  Esta operación NO se puede deshacer');
    console.log('⚠️ '.repeat(30));
    
    const confirmed = await askConfirmation('\n¿Estás seguro de que deseas continuar? (s/N): ');

    if (!confirmed) {
      console.log('\n❌ Operación cancelada por el usuario.');
      process.exit(0);
    }

    // Eliminar registros
    console.log('\n🗑️  Eliminando registros...');
    const result = await clearAllRecords();

    if (result.ok) {
      const deletedCount = result.data ? result.data.length : records.length;
      console.log(`\n✅ Se eliminaron ${deletedCount} registro(s) exitosamente.`);
      console.log('\n🎉 Tabla limpiada correctamente.');
      console.log('\n💡 Ahora puedes ejecutar "npm run import-data" para importar datos frescos.');
      process.exit(0);
    } else {
      console.error(`\n❌ Error al eliminar registros: ${result.status} ${result.statusText}`);
      if (result.data) {
        console.error(`   Detalles: ${JSON.stringify(result.data, null, 2)}`);
      }
      
      console.log('\n💡 Sugerencias:');
      console.log('   - Verifica que la tabla "personas" existe en Supabase');
      console.log('   - Revisa los permisos de la API key (debe permitir DELETE)');
      console.log('   - Comprueba las políticas RLS de la tabla');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n💥 Error durante la limpieza:', error.message);
    console.log('\n💡 Sugerencias:');
    console.log('   - Verifica tu conexión a internet');
    console.log('   - Comprueba que las credenciales en .env son correctas');
    console.log('   - Revisa que la tabla existe en Supabase');
    process.exit(1);
  }
};

// Ejecutar el script
clearData();

