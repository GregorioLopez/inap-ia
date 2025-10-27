import 'dotenv/config';
import { mockProfiles } from './src/services/mockProfiles.js';
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
 * Inserta un perfil en Supabase usando la API REST
 * @param {Object} profileData - Datos del perfil a insertar
 * @returns {Promise<Object>} - Resultado de la operación
 */
const insertProfile = async (profileData) => {
  const response = await fetch(`${supabaseUrl}/rest/v1/${TABLE_NAME}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(profileData),
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
 * Script principal para resetear y repoblar la tabla
 */
const resetData = async () => {
  console.log('🔄 Script de Reset y Repoblación - Supabase\n');
  console.log(`🎯 Tabla: ${TABLE_NAME}`);
  console.log(`🔗 URL: ${supabaseUrl}`);
  console.log(`📊 Datos a importar: ${mockProfiles.length} perfiles\n`);
  console.log('═'.repeat(60));

  try {
    // PASO 1: Verificar registros existentes
    console.log('\n📊 PASO 1: Verificando registros existentes...');
    const existingRecords = await getAllRecords();
    
    if (existingRecords.length > 0) {
      console.log(`⚠️  Se encontraron ${existingRecords.length} registro(s) existente(s).`);
      
      // Mostrar algunos registros
      console.log('\n📋 Registros actuales:');
      existingRecords.slice(0, 5).forEach((record, index) => {
        console.log(`   ${index + 1}. ${record.nombre} ${record.apellidos} (${record.organismo})`);
      });
      
      if (existingRecords.length > 5) {
        console.log(`   ... y ${existingRecords.length - 5} más`);
      }

      // Pedir confirmación
      console.log('\n' + '⚠️ '.repeat(30));
      console.log('⚠️  ADVERTENCIA: Se eliminarán TODOS los registros existentes');
      console.log('⚠️  y se reemplazarán con los datos mock');
      console.log('⚠️  Esta operación NO se puede deshacer');
      console.log('⚠️ '.repeat(30));
      
      const confirmed = await askConfirmation('\n¿Deseas continuar? (s/N): ');

      if (!confirmed) {
        console.log('\n❌ Operación cancelada por el usuario.');
        process.exit(0);
      }

      // PASO 2: Limpiar tabla
      console.log('\n🗑️  PASO 2: Limpiando tabla...');
      const clearResult = await clearAllRecords();

      if (!clearResult.ok) {
        throw new Error(`Error al limpiar tabla: ${clearResult.status} ${clearResult.statusText}`);
      }

      const deletedCount = clearResult.data ? clearResult.data.length : existingRecords.length;
      console.log(`✅ Se eliminaron ${deletedCount} registro(s).`);
    } else {
      console.log('✅ La tabla está vacía. Procediendo con la importación...');
    }

    // PASO 3: Importar datos mock
    console.log('\n📥 PASO 3: Importando datos mock...');
    console.log('─'.repeat(60));

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    for (let i = 0; i < mockProfiles.length; i++) {
      const profile = mockProfiles[i];
      
      // Eliminar el campo 'id' ya que Supabase lo genera automáticamente
      const { id, ...profileData } = profile;
      
      try {
        console.log(`\n[${i + 1}/${mockProfiles.length}] Insertando: ${profile.nombre} ${profile.apellidos}...`);
        
        const result = await insertProfile(profileData);

        if (result.ok) {
          successCount++;
          console.log(`✅ Éxito - ID: ${result.data[0]?.id || 'N/A'}`);
        } else {
          errorCount++;
          const errorMsg = `${profile.nombre} ${profile.apellidos} - ${result.status} ${result.statusText}`;
          errors.push(errorMsg);
          console.error(`❌ Error: ${result.status} ${result.statusText}`);
          if (result.data) {
            console.error(`   Detalles: ${JSON.stringify(result.data, null, 2)}`);
          }
        }
      } catch (error) {
        errorCount++;
        const errorMsg = `${profile.nombre} ${profile.apellidos} - ${error.message}`;
        errors.push(errorMsg);
        console.error(`❌ Excepción: ${error.message}`);
      }
    }

    // RESUMEN FINAL
    console.log('\n' + '═'.repeat(60));
    console.log('📋 RESUMEN DE OPERACIÓN');
    console.log('═'.repeat(60));
    console.log(`🗑️  Registros eliminados: ${existingRecords.length}`);
    console.log(`✅ Registros insertados: ${successCount}`);
    console.log(`❌ Errores: ${errorCount}`);
    console.log(`📊 Total procesados: ${mockProfiles.length}`);
    
    if (errors.length > 0) {
      console.log('\n⚠️  ERRORES ENCONTRADOS:');
      errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`);
      });
    }
    
    console.log('\n' + '═'.repeat(60));
    
    if (errorCount > 0) {
      console.log('\n💡 Sugerencias:');
      console.log('   - Verifica que la tabla "personas" existe en Supabase');
      console.log('   - Comprueba que los campos coinciden con el esquema');
      console.log('   - Revisa los permisos de la API key (INSERT y DELETE)');
      process.exit(1);
    } else {
      console.log('\n🎉 ¡Reset y repoblación completados exitosamente!');
      console.log(`\n✨ La tabla "${TABLE_NAME}" ahora contiene ${successCount} registro(s) frescos.`);
      process.exit(0);
    }

  } catch (error) {
    console.error('\n💥 Error fatal durante el reset:', error.message);
    console.log('\n💡 Sugerencias:');
    console.log('   - Verifica tu conexión a internet');
    console.log('   - Comprueba que las credenciales en .env son correctas');
    console.log('   - Revisa que la tabla existe en Supabase');
    console.log('   - Verifica los permisos RLS de la tabla');
    process.exit(1);
  }
};

// Ejecutar el script
resetData();

