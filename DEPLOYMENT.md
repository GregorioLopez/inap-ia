# Despliegue en Netlify

## Preparación

1. **Asegúrate de tener un repositorio Git actualizado:**

   ```bash
   git add .
   git commit -m "Preparar para despliegue en Netlify"
   git push origin main
   ```

2. **Verifica que el archivo `netlify.toml` existe** en la raíz del proyecto

3. **Verifica que el archivo `frontend/.env.example` existe** con las variables de entorno necesarias

## Pasos para desplegar en Netlify

### Opción 1: Desde la interfaz web de Netlify

1. Ve a [netlify.com](https://netlify.com) y crea una cuenta o inicia sesión
2. Haz clic en "Add new site" → "Import an existing project"
3. Selecciona tu proveedor de Git (GitHub, GitLab, Bitbucket)
4. Autoriza a Netlify a acceder a tu repositorio
5. Selecciona el repositorio `inap-ia`
6. Configura los siguientes parámetros:
   - **Build command:** `cd frontend && npm run build`
   - **Publish directory:** `frontend/dist`
7. Haz clic en "Deploy site"

### Opción 2: Desde la línea de comandos

1. Instala Netlify CLI:

   ```bash
   npm install -g netlify-cli
   ```

2. Autentica con Netlify:

   ```bash
   netlify login
   ```

3. Despliega el sitio:
   ```bash
   netlify deploy --prod
   ```

## Variables de Entorno en Netlify

1. Ve a tu sitio en Netlify
2. Haz clic en "Site settings" → "Build & deploy" → "Environment"
3. Haz clic en "Edit variables"
4. Añade las siguientes variables:

   - `VITE_SUPABASE_URL`: Tu URL de Supabase
   - `VITE_SUPABASE_ANON_KEY`: Tu clave anónima de Supabase

5. Haz clic en "Save"

## Redeploy

Después de hacer cambios:

1. Haz commit y push a tu rama principal:

   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push origin main
   ```

2. Netlify automáticamente detectará los cambios y hará un nuevo despliegue

### Forzar un redeploy manual

Si necesitas forzar un redeploy sin hacer cambios:

1. Ve a tu sitio en Netlify
2. Haz clic en "Deploys"
3. Haz clic en el botón "Trigger deploy" → "Deploy site"

Esto es útil si cambias las variables de entorno o la configuración de `netlify.toml`

## Solución de problemas

### El build falla

- Verifica que `npm run build` funciona localmente en la carpeta `frontend`
- Revisa los logs de build en Netlify para más detalles

### Las variables de entorno no se cargan

- Asegúrate de que las variables están configuradas en Netlify
- Verifica que los nombres coinciden exactamente (incluyendo mayúsculas/minúsculas)
- Redeploy después de cambiar las variables

### Las rutas no funcionan (Error 404 en rutas como /profile/101)

- El archivo `netlify.toml` ya incluye la configuración para SPA (Single Page Application)
- Todas las rutas se redirigen a `index.html` para que Vue Router las maneje
- También existe un archivo `frontend/public/_redirects` como respaldo
- **Si aún así no funciona:**
  1. Haz commit y push de los cambios:
     ```bash
     git add .
     git commit -m "Corregir configuración de rutas"
     git push origin main
     ```
  2. Fuerza un redeploy manual en Netlify (ver sección "Forzar un redeploy manual")
  3. Espera a que el build se complete (puede tomar 1-2 minutos)
  4. Prueba la ruta nuevamente

## Información del sitio

Una vez desplegado, tu sitio estará disponible en:

- URL por defecto: `https://[nombre-del-sitio].netlify.app`
- Puedes configurar un dominio personalizado en "Site settings" → "Domain management"
