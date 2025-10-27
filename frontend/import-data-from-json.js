import 'dotenv/config';
import fetch from 'node-fetch';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Obtener el directorio actual en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de Supabase desde variables de entorno
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

// Nombre de la tabla en Supabase
const TABLE_NAME = 'personas';

// Ruta al archivo JSON con los datos mock
const JSON_FILE_PATH = join(__dirname, 'src', 'data', 'mock-profiles.json');

// Validación de variables de entorno
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Faltan las credenciales de Supabase.');
  console.error('Por favor, crea un archivo .env con:');
  console.error('  VITE_SUPABASE_URL=https://tu-proyecto.supabase.co');
  console.error('  VITE_SUPABASE_KEY=tu-anon-key');
  process.exit(1);
}

/**
 * Lee los datos mock desde el archivo JSON
 * @returns {Array} - Array de perfiles
 */
const loadMockData = () => {
  try {
    const fileContent = readFileSync(JSON_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`❌ Error al leer el archivo JSON: ${error.message}`);
    console.error(`   Ruta: ${JSON_FILE_PATH}`);
    process.exit(1);
  }
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
      'Prefer': 'return=representation' // Devuelve el registro insertado
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
 * Importa todos los perfiles desde el archivo JSON a Supabase
 */
const importData = async () => {
  console.log('🚀 Iniciando importación de datos desde JSON a Supabase...\n');
  
  // Cargar datos del archivo JSON
  const mockProfiles = loadMockData();
  
  console.log(`📁 Archivo JSON: ${JSON_FILE_PATH}`);
  console.log(`📊 Total de perfiles a importar: ${mockProfiles.length}`);
  console.log(`🎯 Tabla destino: ${TABLE_NAME}`);
  console.log(`🔗 URL de Supabase: ${supabaseUrl}\n`);
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
        console.log(`✅ Éxito - ID generado: ${result.data[0]?.id || 'N/A'}`);
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

  // Resumen final
  console.log('\n' + '═'.repeat(60));
  console.log('📋 RESUMEN DE IMPORTACIÓN');
  console.log('═'.repeat(60));
  console.log(`✅ Insertados correctamente: ${successCount}`);
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
    console.log('   - Comprueba que los campos coinciden con el esquema de la tabla');
    console.log('   - Revisa los permisos de la API key (debe permitir INSERT)');
    console.log('   - Si hay registros duplicados, considera eliminarlos primero');
    process.exit(1);
  } else {
    console.log('\n🎉 ¡Importación completada exitosamente!');
    console.log(`\n💡 Puedes editar los datos en: ${JSON_FILE_PATH}`);
    process.exit(0);
  }
};

// Ejecutar la importación
importData().catch((error) => {
  console.error('\n💥 Error fatal durante la importación:', error);
  process.exit(1);
});

