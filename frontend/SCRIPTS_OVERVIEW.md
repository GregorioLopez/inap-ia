# 📚 Resumen de Scripts de Gestión de Datos

Este documento proporciona una visión general rápida de todos los scripts disponibles para gestionar datos en Supabase.

## 🎯 Scripts Disponibles

### 1. 📥 `import-data.js` - Importación desde JavaScript

**Comando**: `npm run import-data`

**Descripción**: Importa datos mock desde el archivo `src/services/mockProfiles.js` (formato JavaScript/ES6).

**Cuándo usar**:
- Cuando quieres importar datos definidos en código JavaScript
- Para mantener los datos mock junto con el código de la aplicación
- Ideal para desarrollo rápido

**Características**:
- ✅ Lee datos desde `mockProfiles.js`
- ✅ Usa API REST de Supabase
- ✅ Manejo detallado de errores
- ✅ Resumen completo de la operación
- ✅ No requiere archivos externos

---

### 2. 📄 `import-data-from-json.js` - Importación desde JSON

**Comando**: `npm run import-data-json`

**Descripción**: Importa datos mock desde el archivo `src/data/mock-profiles.json` (formato JSON puro).

**Cuándo usar**:
- Cuando prefieres editar datos en formato JSON
- Para facilitar la edición por personas no técnicas
- Cuando necesitas importar datos desde fuentes externas

**Características**:
- ✅ Lee datos desde archivo JSON
- ✅ Más fácil de editar que JavaScript
- ✅ Formato estándar e intercambiable
- ✅ Mismas capacidades que `import-data.js`

**Archivo de datos**: `frontend/src/data/mock-profiles.json`

---

### 3. 🗑️ `clear-data.js` - Limpieza de Tabla

**Comando**: `npm run clear-data`

**Descripción**: Elimina TODOS los registros de la tabla `personas` en Supabase.

**Cuándo usar**:
- Antes de importar datos frescos
- Para limpiar datos de prueba
- Cuando necesitas empezar desde cero

**Características**:
- ⚠️ Pide confirmación antes de eliminar
- ✅ Muestra los registros que se eliminarán
- ✅ Cuenta los registros eliminados
- ✅ Operación segura con confirmación

**⚠️ ADVERTENCIA**: Esta acción NO se puede deshacer.

---

### 4. 🔄 `reset-data.js` - Reset Completo

**Comando**: `npm run reset-data`

**Descripción**: Combina limpieza e importación en un solo paso. Elimina todos los registros existentes y luego importa los datos mock.

**Cuándo usar**:
- Para repoblar la base de datos desde cero
- Cuando quieres asegurar datos frescos
- Para resetear el estado de desarrollo

**Características**:
- ⚠️ Pide confirmación antes de proceder
- ✅ Muestra registros existentes antes de eliminar
- ✅ Limpia la tabla completamente
- ✅ Importa datos mock automáticamente
- ✅ Resumen completo de ambas operaciones

**⚠️ ADVERTENCIA**: Esta acción NO se puede deshacer.

---

## 🔄 Flujo de Trabajo Recomendado

### Primer Setup (Base de datos vacía)

```bash
# 1. Importar datos iniciales
npm run import-data
```

### Desarrollo Continuo

```bash
# Opción A: Solo añadir más datos (si no hay duplicados)
npm run import-data

# Opción B: Limpiar y empezar de nuevo
npm run reset-data
```

### Limpiar Todo

```bash
# Eliminar todos los datos
npm run clear-data
```

---

## 📊 Comparación Rápida

| Script | Limpia | Importa | Confirmación | Fuente de Datos |
|--------|--------|---------|--------------|-----------------|
| `import-data` | ❌ | ✅ | ❌ | `mockProfiles.js` |
| `import-data-json` | ❌ | ✅ | ❌ | `mock-profiles.json` |
| `clear-data` | ✅ | ❌ | ✅ | N/A |
| `reset-data` | ✅ | ✅ | ✅ | `mockProfiles.js` |

---

## 🛠️ Detalles Técnicos

### Tecnología Utilizada

Todos los scripts utilizan:
- **API REST de Supabase** (no el SDK de JavaScript)
- **node-fetch** para peticiones HTTP
- **dotenv** para variables de entorno
- **ES Modules** (import/export)

### Endpoints de Supabase Utilizados

```javascript
// GET - Obtener registros
GET ${supabaseUrl}/rest/v1/personas?select=*

// POST - Insertar registros
POST ${supabaseUrl}/rest/v1/personas

// DELETE - Eliminar registros
DELETE ${supabaseUrl}/rest/v1/personas?id=neq.00000000-0000-0000-0000-000000000000
```

### Headers Requeridos

```javascript
{
  'Content-Type': 'application/json',
  'apikey': supabaseKey,
  'Authorization': `Bearer ${supabaseKey}`,
  'Prefer': 'return=representation' // Para obtener datos insertados
}
```

---

## 🔐 Requisitos de Permisos

Para que los scripts funcionen, necesitas configurar las siguientes políticas RLS en Supabase:

### Para `import-data` y `import-data-json`

```sql
CREATE POLICY "Enable insert for anon users" ON personas
  FOR INSERT TO anon WITH CHECK (true);
```

### Para `clear-data` y `reset-data`

```sql
CREATE POLICY "Enable delete for anon users" ON personas
  FOR DELETE TO anon USING (true);
```

### Para verificar datos (todos los scripts)

```sql
CREATE POLICY "Enable read access for all users" ON personas
  FOR SELECT TO anon USING (true);
```

---

## 📝 Formato de Datos

### Estructura de un Perfil

```json
{
  "nombre": "Ada",
  "apellidos": "Lovelace",
  "foto_url": "https://randomuser.me/api/portraits/women/1.jpg",
  "organismo": "Royal Society",
  "cargo": "Matemática y escritora",
  "cv": "Pionera de la programación...",
  "linkedin_url": "https://linkedin.com",
  "github_url": "https://github.com"
}
```

**Nota**: El campo `id` se omite automáticamente ya que Supabase lo genera.

---

## 🐛 Solución de Problemas

### Error: "Faltan las credenciales de Supabase"

**Solución**: Verifica que el archivo `.env` existe y contiene:
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_KEY=tu-anon-key
```

### Error 401 (Unauthorized)

**Solución**: Verifica que la API key es correcta y está activa.

### Error 403 (Forbidden)

**Solución**: Configura las políticas RLS en Supabase (ver sección de Permisos).

### Error 404 (Not Found)

**Solución**: Verifica que la tabla `personas` existe en Supabase.

### Registros Duplicados

**Solución**: Usa `npm run reset-data` en lugar de `npm run import-data`.

---

## 💡 Tips y Mejores Prácticas

1. **Usa `reset-data` para desarrollo**: Asegura datos consistentes cada vez.

2. **Edita el JSON para datos personalizados**: El archivo `mock-profiles.json` es más fácil de editar.

3. **Verifica permisos antes de ejecutar**: Asegúrate de que las políticas RLS están configuradas.

4. **Haz backup antes de `clear-data`**: Exporta los datos desde Supabase si son importantes.

5. **Usa variables de entorno**: Nunca hardcodees las credenciales en el código.

---

## 📚 Recursos Adicionales

- [Documentación completa](./IMPORT_DATA_README.md)
- [README principal](../README.md)
- [Documentación de Supabase REST API](https://supabase.com/docs/guides/api)
- [Documentación de RLS](https://supabase.com/docs/guides/auth/row-level-security)

---

## 🤝 Soporte

Si tienes problemas:
1. Revisa los logs del script (son muy detallados)
2. Consulta la sección de Solución de Problemas
3. Verifica la configuración de Supabase
4. Revisa la documentación completa en `IMPORT_DATA_README.md`

