# Aplicación de perfiles Profesionales

Aplicación web para gestionar y visualizar perfiles profesionales, construida con Vue 3, Vite, Tailwind CSS, PrimeVue y Supabase.

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js (v14 o superior)
- Cuenta de Supabase
- npm o yarn

### Instalación

1. **Clona el repositorio**

```bash
git clone <url-del-repositorio>
cd inap-ia/frontend
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Configura las variables de entorno**

Crea un archivo `.env` en el directorio `frontend/`:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_KEY=tu-anon-key
```

4. **Ejecuta la aplicación en modo desarrollo**

```bash
npm run dev
```

## 📊 Scripts de Gestión de Datos

La aplicación incluye varios scripts para gestionar los datos de prueba en Supabase usando la **API REST** directamente:

### 📥 Importar Datos Mock

Importa los perfiles de prueba desde `mockProfiles.js`:

```bash
npm run import-data
```

O desde el archivo JSON (`src/data/mock-profiles.json`):

```bash
npm run import-data-json
```

### 🗑️ Limpiar Datos

Elimina todos los registros de la tabla `personas`:

```bash
npm run clear-data
```

⚠️ **Advertencia**: Esta acción no se puede deshacer. El script pedirá confirmación.

### 🔄 Reset Completo

Limpia la tabla y vuelve a importar los datos mock en un solo paso:

```bash
npm run reset-data
```

### 📖 Documentación Detallada

Para más información sobre los scripts de importación, consulta:

- [`frontend/IMPORT_DATA_README.md`](frontend/IMPORT_DATA_README.md) - Guía completa de uso

## 🏗️ Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/      # Componentes Vue reutilizables
│   ├── views/          # Vistas/páginas de la aplicación
│   ├── stores/         # Stores de Pinia
│   ├── services/       # Servicios (API, Supabase)
│   ├── data/           # Datos mock en JSON
│   └── router/         # Configuración de Vue Router
├── import-data.js      # Script de importación desde JS
├── import-data-from-json.js  # Script de importación desde JSON
├── clear-data.js       # Script para limpiar la tabla
├── reset-data.js       # Script de reset completo
└── .env               # Variables de entorno (no incluido en git)
```

## 🗄️ Esquema de Base de Datos

La tabla `personas` en Supabase tiene la siguiente estructura:

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

## 🛠️ Tecnologías Utilizadas

- **Frontend Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Estilos**: Tailwind CSS
- **Componentes UI**: PrimeVue
- **Estado**: Pinia
- **Routing**: Vue Router
- **Backend**: Supabase (BaaS)
- **Base de Datos**: PostgreSQL (gestionada por Supabase)

## 📝 Scripts Disponibles

```bash
npm run dev              # Inicia el servidor de desarrollo
npm run build            # Construye la aplicación para producción
npm run preview          # Previsualiza la build de producción
npm run import-data      # Importa datos mock desde JS
npm run import-data-json # Importa datos mock desde JSON
npm run clear-data       # Limpia todos los datos de la tabla
npm run reset-data       # Reset completo (limpia + importa)
```

## 🔐 Configuración de Supabase

### Políticas RLS (Row Level Security)

Para que los scripts funcionen correctamente, necesitas configurar las políticas de seguridad en Supabase:

```sql
-- Permitir lectura pública
CREATE POLICY "Enable read access for all users" ON personas
  FOR SELECT
  TO anon
  USING (true);

-- Permitir inserción (solo para desarrollo/testing)
CREATE POLICY "Enable insert for anon users" ON personas
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Permitir eliminación (solo para desarrollo/testing)
CREATE POLICY "Enable delete for anon users" ON personas
  FOR DELETE
  TO anon
  USING (true);
```

⚠️ **Nota**: Estas políticas son permisivas y solo deben usarse en desarrollo. En producción, implementa políticas más restrictivas basadas en autenticación.

## 🎨 Características

- ✅ Vista de tabla con paginación y ordenamiento
- ✅ Vista de tarjetas (cards) responsive
- ✅ Búsqueda y filtrado de perfiles
- ✅ Página de detalle de perfil
- ✅ Diseño responsive y accesible
- ✅ Integración con Supabase
- ✅ Scripts de gestión de datos

## 📄 Licencia

Este proyecto es una Prueba de Concepto (PoC) para fines educativos.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.
