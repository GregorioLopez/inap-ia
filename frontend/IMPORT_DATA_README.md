# Script de Importación de Datos Mock a Supabase

Este script permite inyectar los datos de prueba (mock) en la base de datos de Supabase utilizando la API REST.

## 📋 Requisitos Previos

1. **Node.js** instalado (versión 14 o superior)
2. **Proyecto de Supabase** configurado con la tabla `personas`
3. **Credenciales de Supabase** (URL del proyecto y API Key)

## 🗄️ Esquema de la Tabla `personas`

Asegúrate de que tu tabla en Supabase tenga la siguiente estructura:

```sql
CREATE TABLE personas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  nombre TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  foto_url TEXT,
  organismo TEXT,
  cargo TEXT,
  cv TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  web_personal_url TEXT
);
```

## ⚙️ Configuración

### 1. Archivo de Variables de Entorno

Crea o verifica que existe el archivo `.env` en el directorio `frontend/` con las siguientes variables:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_KEY=tu-anon-key
```

**Dónde encontrar estas credenciales:**

1. Ve a tu proyecto en [Supabase](https://app.supabase.com)
2. En el menú lateral, selecciona **Settings** → **API**
3. Copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_KEY`

### 2. Permisos de la Tabla

Asegúrate de que la tabla `personas` tiene los permisos adecuados para permitir inserciones desde la API:

1. Ve a **Authentication** → **Policies** en Supabase
2. Para la tabla `personas`, crea una política que permita `INSERT` con la anon key
3. Ejemplo de política simple (solo para desarrollo):

```sql
-- Política para permitir inserciones públicas (solo para desarrollo/testing)
CREATE POLICY "Enable insert for anon users" ON personas
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

⚠️ **Nota de Seguridad**: Esta política permite inserciones públicas. En producción, deberías usar políticas más restrictivas basadas en autenticación.

## 🚀 Uso del Script

### Instalación de Dependencias

Si aún no lo has hecho, instala las dependencias del proyecto:

```bash
cd frontend
npm install
```

### Ejecutar el Script

Desde el directorio `frontend/`, ejecuta:

```bash
npm run import-data
```

O directamente con Node:

```bash
node import-data.js
```

## 📊 Salida del Script

El script mostrará información detallada durante la ejecución:

```
🚀 Iniciando importación de datos mock a Supabase...

📊 Total de perfiles a importar: 5
🎯 Tabla destino: personas
🔗 URL de Supabase: https://tu-proyecto.supabase.co

────────────────────────────────────────────────────────────

[1/5] Insertando: Ada Lovelace...
✅ Éxito - ID generado: 123e4567-e89b-12d3-a456-426614174000

[2/5] Insertando: Grace Hopper...
✅ Éxito - ID generado: 123e4567-e89b-12d3-a456-426614174001

...

════════════════════════════════════════════════════════════
📋 RESUMEN DE IMPORTACIÓN
════════════════════════════════════════════════════════════
✅ Insertados correctamente: 5
❌ Errores: 0
📊 Total procesados: 5

════════════════════════════════════════════════════════════

🎉 ¡Importación completada exitosamente!
```

## 🔧 Solución de Problemas

### Error: "Faltan las credenciales de Supabase"

**Causa**: El archivo `.env` no existe o no contiene las variables necesarias.

**Solución**: 
- Verifica que el archivo `.env` existe en `frontend/`
- Asegúrate de que contiene `VITE_SUPABASE_URL` y `VITE_SUPABASE_KEY`

### Error 401 (Unauthorized)

**Causa**: La API key es incorrecta o ha expirado.

**Solución**: 
- Verifica que estás usando la **anon/public key** correcta
- Copia nuevamente la key desde el panel de Supabase

### Error 404 (Not Found)

**Causa**: La tabla `personas` no existe en Supabase.

**Solución**: 
- Crea la tabla usando el esquema SQL proporcionado arriba
- Verifica que el nombre de la tabla es exactamente `personas` (minúsculas)

### Error 403 (Forbidden)

**Causa**: La tabla no tiene permisos para permitir inserciones.

**Solución**: 
- Configura las políticas RLS (Row Level Security) en Supabase
- Crea una política que permita `INSERT` para usuarios anónimos (ver sección de Permisos)

### Error: Registros duplicados

**Causa**: Los datos ya fueron importados previamente.

**Solución**: 
- Elimina los registros existentes desde el panel de Supabase
- O modifica el script para usar `UPSERT` en lugar de `INSERT`

## 📝 Datos Mock Incluidos

El script importa 5 perfiles de ejemplo:

1. **Ada Lovelace** - Matemática y escritora (Royal Society)
2. **Grace Hopper** - Científica de la computación (US Navy)
3. **Margaret Hamilton** - Ingeniera de software (NASA)
4. **Alan Turing** - Científico de la computación (Bletchley Park)
5. **Linus Torvalds** - Ingeniero de software (Linux Foundation)

## 🔄 Modificar los Datos Mock

Para cambiar los datos que se importan, edita el archivo:

```
frontend/src/services/mockProfiles.js
```

## 🛠️ Personalización del Script

### Cambiar el Nombre de la Tabla

Si tu tabla tiene un nombre diferente, modifica la constante en `import-data.js`:

```javascript
const TABLE_NAME = 'tu_nombre_de_tabla';
```

### Usar UPSERT en lugar de INSERT

Para evitar errores de duplicados, puedes cambiar el header `Prefer`:

```javascript
'Prefer': 'resolution=merge-duplicates'
```

## 📚 Recursos Adicionales

- [Documentación de Supabase REST API](https://supabase.com/docs/guides/api)
- [Documentación de Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Documentación de Políticas de Supabase](https://supabase.com/docs/guides/auth/row-level-security#policies)

## 🤝 Soporte

Si encuentras problemas:

1. Verifica los logs del script para detalles del error
2. Revisa la consola de Supabase para ver los logs del servidor
3. Consulta la documentación oficial de Supabase

