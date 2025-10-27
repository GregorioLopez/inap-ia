# 🚀 Guía de Inicio Rápido - Scripts de Datos

Esta guía te llevará paso a paso para configurar y usar los scripts de gestión de datos.

## ✅ Paso 1: Verificar Requisitos

Asegúrate de tener:

- [x] Node.js instalado (v14+)
- [x] Cuenta de Supabase creada
- [x] Proyecto de Supabase configurado
- [x] Dependencias instaladas (`npm install`)

## 📋 Paso 2: Crear la Tabla en Supabase

1. Ve a tu proyecto en [Supabase](https://app.supabase.com)
2. Navega a **SQL Editor**
3. Ejecuta el siguiente SQL:

```sql
-- Crear la tabla personas
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

-- Habilitar Row Level Security
ALTER TABLE personas ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública
CREATE POLICY "Enable read access for all users" ON personas
  FOR SELECT
  TO anon
  USING (true);

-- Política para inserción (desarrollo)
CREATE POLICY "Enable insert for anon users" ON personas
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política para eliminación (desarrollo)
CREATE POLICY "Enable delete for anon users" ON personas
  FOR DELETE
  TO anon
  USING (true);
```

4. Haz clic en **Run** para ejecutar el SQL

## 🔑 Paso 3: Obtener Credenciales de Supabase

1. En tu proyecto de Supabase, ve a **Settings** → **API**
2. Copia los siguientes valores:
   - **Project URL** (ejemplo: `https://xxxxx.supabase.co`)
   - **anon/public key** (una cadena larga que empieza con `eyJ...`)

## ⚙️ Paso 4: Configurar Variables de Entorno

1. En el directorio `frontend/`, crea un archivo llamado `.env`

```bash
cd frontend
touch .env  # En Windows: type nul > .env
```

2. Abre el archivo `.env` y añade tus credenciales:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Guarda el archivo

⚠️ **Importante**: Nunca compartas este archivo ni lo subas a Git (ya está en `.gitignore`)

## 📥 Paso 5: Importar Datos de Prueba

Ahora puedes importar los datos mock. Tienes dos opciones:

### Opción A: Importar desde JavaScript

```bash
npm run import-data
```

### Opción B: Importar desde JSON

```bash
npm run import-data-json
```

**Salida esperada:**

```
🚀 Iniciando importación de datos mock a Supabase...

📊 Total de perfiles a importar: 5
🎯 Tabla destino: personas
🔗 URL de Supabase: https://xxxxx.supabase.co

────────────────────────────────────────────────────────────

[1/5] Insertando: Ada Lovelace...
✅ Éxito - ID generado: abc123...

[2/5] Insertando: Grace Hopper...
✅ Éxito - ID generado: def456...

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

## ✨ Paso 6: Verificar los Datos

1. Ve a Supabase → **Table Editor** → **personas**
2. Deberías ver 5 registros con los perfiles de prueba

O ejecuta la aplicación:

```bash
npm run dev
```

Y abre http://localhost:5173 en tu navegador.

## 🎯 ¡Listo!

Ya tienes todo configurado. Ahora puedes:

- ✅ Ver los perfiles en la aplicación
- ✅ Probar la búsqueda y filtros
- ✅ Navegar a los detalles de cada perfil

---

## 🔄 Operaciones Adicionales

### Limpiar Todos los Datos

Si quieres eliminar todos los registros:

```bash
npm run clear-data
```

El script te pedirá confirmación antes de eliminar.

### Reset Completo (Limpiar + Importar)

Para empezar desde cero con datos frescos:

```bash
npm run reset-data
```

Este comando:
1. Te muestra los registros existentes
2. Pide confirmación
3. Elimina todos los registros
4. Importa los datos mock nuevamente

---

## 🐛 Solución de Problemas Comunes

### ❌ Error: "Faltan las credenciales de Supabase"

**Problema**: El archivo `.env` no existe o está mal configurado.

**Solución**:
1. Verifica que el archivo `.env` existe en `frontend/`
2. Asegúrate de que contiene las dos variables:
   ```env
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_KEY=...
   ```
3. No debe haber espacios alrededor del `=`
4. Las URLs no deben tener comillas

### ❌ Error 401 (Unauthorized)

**Problema**: La API key es incorrecta.

**Solución**:
1. Ve a Supabase → Settings → API
2. Copia nuevamente la **anon/public key**
3. Actualiza el archivo `.env`
4. Asegúrate de copiar la key completa (es muy larga)

### ❌ Error 403 (Forbidden)

**Problema**: Las políticas RLS no están configuradas.

**Solución**:
1. Ve a Supabase → Authentication → Policies
2. Verifica que existen las políticas para `personas`
3. Si no existen, ejecuta el SQL del Paso 2 nuevamente

### ❌ Error 404 (Not Found)

**Problema**: La tabla `personas` no existe.

**Solución**:
1. Ve a Supabase → Table Editor
2. Verifica que existe la tabla `personas`
3. Si no existe, ejecuta el SQL del Paso 2

### ❌ Registros Duplicados

**Problema**: Intentaste importar los datos dos veces.

**Solución**:
```bash
# Opción 1: Limpiar y volver a importar
npm run reset-data

# Opción 2: Solo limpiar
npm run clear-data
```

### ❌ Error: "Cannot find module"

**Problema**: Las dependencias no están instaladas.

**Solución**:
```bash
npm install
```

---

## 📚 Próximos Pasos

Ahora que tienes los datos importados, puedes:

1. **Explorar la aplicación**: Prueba las diferentes vistas y funcionalidades
2. **Personalizar los datos**: Edita `src/data/mock-profiles.json` y vuelve a importar
3. **Añadir más perfiles**: Agrega nuevos objetos al array en el JSON
4. **Desarrollar nuevas features**: Usa los datos para probar nuevas funcionalidades

---

## 📖 Documentación Adicional

- [Resumen de Scripts](./SCRIPTS_OVERVIEW.md) - Comparación de todos los scripts
- [Guía Completa](./IMPORT_DATA_README.md) - Documentación detallada
- [README Principal](../README.md) - Información general del proyecto

---

## 💡 Tips Útiles

1. **Usa `reset-data` frecuentemente**: Mantiene tus datos de prueba consistentes
2. **Edita el JSON**: Es más fácil que editar JavaScript
3. **Verifica Supabase**: Usa el Table Editor para ver los datos en tiempo real
4. **Lee los logs**: Los scripts proporcionan información muy detallada
5. **Haz backup**: Exporta datos importantes antes de usar `clear-data`

---

## 🎉 ¡Felicidades!

Has configurado exitosamente el sistema de gestión de datos. Si tienes problemas, revisa la sección de Solución de Problemas o consulta la documentación completa.

**¡Feliz desarrollo!** 🚀

